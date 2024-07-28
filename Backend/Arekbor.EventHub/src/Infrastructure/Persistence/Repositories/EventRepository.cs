using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.EventHub.Domain.Enums;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class EventRepository(
    MongoDbContext mongoDbContext) : BaseRepository<Event>(mongoDbContext), IEventRepository
{
    public Task<List<EventResult>> FindEventsAsync(Guid userId, DateTime start, DateTime end, CancellationToken cancellationToken)
    {
        var pipelines = new[]
        {
            new BsonDocument("$match", new BsonDocument
            {
                { "Start", new BsonDocument("$gte", start) },
                { "End", new BsonDocument("$lte", end) }
            }),

            new BsonDocument("$lookup", new BsonDocument
            {
                { "let", new BsonDocument("userId", "$UserId") },
                { "from", "calendarpermissions" },
                { "pipeline", new BsonArray
                    {
                        new BsonDocument("$match", new BsonDocument
                        {
                            { "$expr", new BsonDocument
                                {
                                    { "$and", new BsonArray
                                        {
                                            new BsonDocument("$eq", new BsonArray { "$UserManagerId", "$$userId" }),
                                            new BsonDocument("$eq", new BsonArray { "$UserId", userId.ToString() })
                                        }
                                    }
                                }
                            }
                        }),

                        new BsonDocument("$project", new BsonDocument
                        {
                            { "Access", true },
                            { "_id", false }
                        }),

                        new BsonDocument("$limit", 1)
                    }
                },
                { "as", "permissions" }
            }),

            new BsonDocument("$unwind", new BsonDocument
            {
                { "path", "$permissions" },
                { "preserveNullAndEmptyArrays", true }
            }),

            new BsonDocument("$match", new BsonDocument
            {
                { "$or", new BsonArray
                    {
                        new BsonDocument("permissions.Access", CalendarAccess.CanOnlyRead),
                        new BsonDocument("permissions.Access", CalendarAccess.CanReadAndModify)
                    }
                }
            }),

            new BsonDocument("$lookup", new BsonDocument{
                { "from", "calendarsettings" },
                { "localField", "UserId" },
                { "foreignField", "UserId" },
                { "as", "settings" }
            }),

            new BsonDocument("$unwind", new BsonDocument
            {
                { "path", "$settings" },
                { "preserveNullAndEmptyArrays", true }
            }),

            new BsonDocument("$project", new BsonDocument
            {
                { "Id", true },
                { "Title", true },
                { "AllDay", true },
                { "Start", true },
                { "End", true },
                { "Description", true },
                { "UserId", true },
                { "Color", "$settings.Color" }
            })
        };

        return MongoDbContext
            .Collection<Event>()
            .Aggregate<EventResult>(pipelines, cancellationToken: cancellationToken)
            .ToListAsync(cancellationToken);
    }
}
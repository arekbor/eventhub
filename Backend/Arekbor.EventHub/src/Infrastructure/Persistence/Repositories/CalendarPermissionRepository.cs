using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class CalendarPermissionRepository(
    MongoDbContext mongoDbContext
) : BaseRepository<CalendarPermission>(mongoDbContext), ICalendarPermissionRepository
{
    public Task<CalendarPermission> FindUserCalendarPermissionAsync(
        Guid userId, Guid userManagerId, CancellationToken cancellationToken)
    {
        return MongoDbContext.Collection<CalendarPermission>()
            .Find(x => x.UserManagerId == userId && x.UserId == userManagerId)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<PaginatedList<CalendarPermissionResult>> FindUserCalendarPermissionsAsync
        (Guid userManagerId, int pageNumber, int pageSize, CancellationToken cancellationToken)
    {
        var pipelines = new[]
        {
            new BsonDocument("$match", new BsonDocument
            {
                { "UserManagerId", userManagerId.ToString() }
            }),
            new BsonDocument("$lookup", new BsonDocument
            {
                { "from", "users" },
                { "localField", "UserId" },
                { "foreignField", "_id" },
                { "as", "userResult" }
            }),
            new BsonDocument("$unwind", "$userResult"),
            new BsonDocument("$addFields", new BsonDocument
            {
                { "Username", "$userResult.Username" },
                { "Email", "$userResult.Email" }
            }),
            new BsonDocument("$project", new BsonDocument
            {
                { "_id", false },
                { "UserId", true },
                { "Access", true },
                { "Username", true },
                { "Email", true },
            }),
        };

        return await PaginatedQuery.PaginateAsync<CalendarPermission, CalendarPermissionResult>(
            MongoDbContext.Collection<CalendarPermission>(),
            pipelines,
            pageNumber,
            pageSize,
            cancellationToken
        );
    }
}
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class EventRepository(
    MongoDbContext mongoDbContext) : BaseRepository<Event>(mongoDbContext), IEventRepository
{
    public Task<List<Event>> FetchEvents(
        DateTime start, DateTime end, CancellationToken cancellationToken)
    {
        var filter = Builders<Event>.Filter.And(
            Builders<Event>.Filter.Gte(x => x.Start, start),
            Builders<Event>.Filter.Lte(x => x.End, end)
        );

        return MongoDbContext.Collection<Event>().Find(filter)
            .ToListAsync(cancellationToken);
    }
}
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class CalendarEventRepository(
    MongoDbContext mongoDbContext) : BaseRepository<CalendarEvent>(mongoDbContext), ICalendarEventRepository
{
    public Task<List<CalendarEvent>> FetchCalendarEvents(
        DateTime start, DateTime end, CancellationToken cancellationToken)
    {
        var filter = Builders<CalendarEvent>.Filter.And(
            Builders<CalendarEvent>.Filter.Gte(x => x.Start, start),
            Builders<CalendarEvent>.Filter.Lte(x => x.End, end)
        );

        return MongoDbContext.Collection<CalendarEvent>().Find(filter)
            .ToListAsync(cancellationToken);
    }
}
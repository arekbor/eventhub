using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class CalendarSettingsRepository(
    MongoDbContext mongoDbContext
) : BaseRepository<CalendarSettings>(mongoDbContext), ICalendarSettingsRepository
{
    public Task<CalendarSettings> FindCalendarSettings(Guid userId, CancellationToken cancellationToken)
        => MongoDbContext.Collection<CalendarSettings>()
            .Find(x => x.UserId == userId).FirstOrDefaultAsync(cancellationToken);
}

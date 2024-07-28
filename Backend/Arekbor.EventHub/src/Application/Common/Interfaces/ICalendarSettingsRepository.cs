namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface ICalendarSettingsRepository : IBaseRepository<Domain.Entities.CalendarSettings>
{
   Task<Domain.Entities.CalendarSettings> FindCalendarSettings(Guid userId, CancellationToken cancellationToken);
}
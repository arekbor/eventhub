using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface ICalendarEventRepository : IBaseRepository<CalendarEvent>
{
    Task<List<CalendarEvent>> FetchCalendarEvents(
        DateTime start, DateTime end, CancellationToken cancellationToken);
}
using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IEventRepository : IBaseRepository<Event>
{
    Task<List<Event>> FetchEvents(
        DateTime start, DateTime end, CancellationToken cancellationToken);
}
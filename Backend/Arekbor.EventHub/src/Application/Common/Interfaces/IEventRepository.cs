using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IEventRepository : IBaseRepository<Event>
{
    Task<List<EventResult>> FindEventsAsync(
        Guid userId, DateTime start, DateTime end, CancellationToken cancellationToken);
}
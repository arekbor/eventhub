using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface ICalendarPermissionRepository : IBaseRepository<CalendarPermission>
{
    Task<PaginatedList<CalendarPermission>> FindUserCalendarPermissionsAsync(
        Guid userManagerId, int pageNumber, int pageSize, CancellationToken cancellationToken);

    Task<CalendarPermission> FindUserCalendarPermissionAsync(
        Guid userId, Guid userManagerId, CancellationToken cancellationToken);
}
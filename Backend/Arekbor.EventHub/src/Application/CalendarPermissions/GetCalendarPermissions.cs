using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Application.Common.Models;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public record GetCalendarPermissions(int PageNumber, int PageSize) : IRequest<PaginatedList<CalendarPermissionResult>>;

internal class GetCalendarPermissionsHandler(
    ICalendarPermissionRepository calendarPermissionRepository,
    ICurrentUserService currentUserService
) : IRequestHandler<GetCalendarPermissions, PaginatedList<CalendarPermissionResult>>
{
    public async Task<PaginatedList<CalendarPermissionResult>> Handle(GetCalendarPermissions request, CancellationToken cancellationToken)
    {
        return await calendarPermissionRepository
            .FindUserCalendarPermissionsAsync(
                currentUserService.GetId(), request.PageNumber, request.PageSize, cancellationToken);
    }
}
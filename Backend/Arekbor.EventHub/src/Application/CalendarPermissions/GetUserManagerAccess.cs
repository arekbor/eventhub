using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Enums;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public record GetUserManagerAccess(Guid UserManagerId) : IRequest<CalendarAccess>;

internal class GetUserManagerCalendarPermissionHandler(
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<GetUserManagerAccess, CalendarAccess>
{
    public async Task<CalendarAccess> Handle(
        GetUserManagerAccess request, CancellationToken cancellationToken)
    {
        var calendarPermission = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(currentUserService.GetId(), request.UserManagerId, cancellationToken)
                ?? throw new NotFoundException($"Calendar permission of user manager {request.UserManagerId} not found.");

        return calendarPermission.Access;
    }
}
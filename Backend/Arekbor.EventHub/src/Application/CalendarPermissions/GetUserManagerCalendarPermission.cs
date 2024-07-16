using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Enums;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public record UserManagerCalendarPermissionResult(CalendarAccess Access);

public record GetUserManagerCalendarPermission(Guid UserManagerId) : IRequest<UserManagerCalendarPermissionResult>;

internal class GetUserManagerCalendarPermissionHandler(
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<GetUserManagerCalendarPermission, UserManagerCalendarPermissionResult>
{
    public async Task<UserManagerCalendarPermissionResult> Handle(
        GetUserManagerCalendarPermission request, CancellationToken cancellationToken)
    {
        var calendarPermission = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(currentUserService.GetId(), request.UserManagerId, cancellationToken)
                ?? throw new NotFoundException($"Calendar permission of user manager {request.UserManagerId} not found.");

        return calendarPermission.Adapt<UserManagerCalendarPermissionResult>();
    }
}
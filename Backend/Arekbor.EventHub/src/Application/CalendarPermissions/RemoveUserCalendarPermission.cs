using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public record RemoveUserCalendarPermission(Guid UserId) : IRequest<Unit>;

internal class RemoveUserCalendarPermissionHandler(
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<RemoveUserCalendarPermission, Unit>
{
    public async Task<Unit> Handle(RemoveUserCalendarPermission request, CancellationToken cancellationToken)
    {
        var currentId = currentUserService.GetId();

        var calendarPermission = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(request.UserId, currentId, cancellationToken)
                ?? throw new NotFoundException($"Calendar permission of user ${currentId} not found.");

        if(!calendarPermission.CanModify)
            throw new BadRequestException("Cannot modify calendar permission.");

        await calendarPermissionRepository
            .DeleteAsync(calendarPermission, cancellationToken);
        
        return Unit.Value;
    }
}
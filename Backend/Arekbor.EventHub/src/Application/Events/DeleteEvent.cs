using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using MediatR;

namespace Arekbor.EventHub.Application.Events;

public record DeleteEvent(Guid Id) : IRequest<Unit>;

internal class DeleteEventHandler(
    IEventRepository eventRepository,
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<DeleteEvent, Unit>
{
    public async Task<Unit> Handle(DeleteEvent request, CancellationToken cancellationToken)
    {
        var e = await eventRepository
            .FindAsync(request.Id, cancellationToken)
                ?? throw new NotFoundException($"Event {request.Id} not found.");

        var calendarPermission = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(currentUserService.GetId(), e.UserId, cancellationToken)
                ?? throw new ForbiddenException("You don't have permission.");
        
        if (calendarPermission.Access != Domain.Enums.CalendarAccess.CanReadAndModify)
            throw new ForbiddenException("You don't have permission.");

        await eventRepository.DeleteOneAsync(e, cancellationToken);

        return Unit.Value;
    }
}
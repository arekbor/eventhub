using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.Events;

public record UpdateEvent(
    Guid Id,
    EventBody EventBody
) : IRequest<Unit>;

public class UpdateEventValidator : AbstractValidator<UpdateEvent>
{
    public UpdateEventValidator()
    {
        RuleFor(x => x.EventBody)
            .SetValidator(new EventBodyValidator());
    }
}

internal class UpdateEventHandler(
    IEventRepository eventRepository,
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<UpdateEvent, Unit>
{
    public async Task<Unit> Handle(UpdateEvent request, CancellationToken cancellationToken)
    {
        var e = await eventRepository
            .FindAsync(request.Id, cancellationToken)
                ?? throw new NotFoundException($"Event ${request.Id} not found.");
        
        var calendarPermission = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(currentUserService.GetId(), e.UserId, cancellationToken)
                ?? throw new ForbiddenException("You don't have permission.");
        
        if (calendarPermission.Access != Domain.Enums.CalendarAccess.CanReadAndModify)
            throw new ForbiddenException("You don't have permission.");

        e = request.EventBody.Adapt(e);

        await eventRepository
            .UpdateAsync(e, cancellationToken);

        return Unit.Value;
    }
}
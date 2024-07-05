using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarEvents;

public record CreateCalendarEvent(
    CalendarEventBody CalendarEventBody
) : IRequest<Unit>;

public class CreateCalendarEventValidator : AbstractValidator<CreateCalendarEvent>
{
    public CreateCalendarEventValidator()
    {
        RuleFor(x => x.CalendarEventBody)
            .SetValidator(new CalendarEventBodyValidator());
    }
}

internal class CreateCalendarEventHandler(
    ICurrentUserService currentUserService,
    ICalendarEventRepository calendarEventRepository
) : IRequestHandler<CreateCalendarEvent, Unit>
{
    public async Task<Unit> Handle(CreateCalendarEvent request, CancellationToken cancellationToken)
    {
        var calendarEvent = request.CalendarEventBody.Adapt<CalendarEvent>();
        
        calendarEvent.UserId = currentUserService.GetId();

        await calendarEventRepository.InsertAsync(calendarEvent, cancellationToken);

        return Unit.Value;
    }
}
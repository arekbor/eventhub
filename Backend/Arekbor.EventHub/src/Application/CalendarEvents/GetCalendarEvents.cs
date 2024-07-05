using Arekbor.EventHub.Application.Common.Interfaces;
using FluentValidation;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarEvents;

public record CalendarEventResult(
    Guid Id, string Title, bool AllDay, DateTime Start, DateTime? End, string? Meta
);

public record GetCalendarEvents(
    DateTime Start,
    DateTime End
) : IRequest<IEnumerable<CalendarEventResult>>;

public class GetCalendarEventsValidator : AbstractValidator<GetCalendarEvents>
{
    public GetCalendarEventsValidator()
    {
        // RuleFor(x => x.Start)
        //     .LessThan(x => x.End);

        // RuleFor(x => x.End)
        //     .GreaterThan(x => x.Start);
    }
}

internal class GetCalendarEventsHandler(
    ICalendarEventRepository calendarEventRepository
) : IRequestHandler<GetCalendarEvents, IEnumerable<CalendarEventResult>>
{
    public async Task<IEnumerable<CalendarEventResult>> Handle(GetCalendarEvents request, CancellationToken cancellationToken)
    {
        var events = await calendarEventRepository
            .FetchCalendarEvents(request.Start, request.End, cancellationToken);

        return events.Adapt<IEnumerable<CalendarEventResult>>();
    }
}
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using FluentValidation;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.Events;

public record EventResult(
    Guid Id, 
    string Title, 
    bool AllDay, 
    DateTime Start, 
    DateTime? End, 
    string? Description, 
    string UserId
);

public record GetEvents(
    DateTime Start,
    DateTime End
) : IRequest<IEnumerable<EventResult>>;

public class GetEventsValidator : AbstractValidator<GetEvents>
{
    public GetEventsValidator()
    {
        RuleFor(x => x.Start)
            .LessThan(x => x.End);

        RuleFor(x => x.End)
            .GreaterThan(x => x.Start);
    }
}

internal class GetEventsHandler(
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository,
    IEventRepository eventRepository
) : IRequestHandler<GetEvents, IEnumerable<EventResult>>
{
    public async Task<IEnumerable<EventResult>> Handle(GetEvents request, CancellationToken cancellationToken)
    {
        var events = await eventRepository
            .FindEventsAsync(request.Start, request.End, cancellationToken);

        var filterEvents = new List<Event>();

        foreach(var e in events) {
            var calendarPermission = await calendarPermissionRepository
                .FindUserCalendarPermissionAsync(currentUserService.GetId(), e.UserId, cancellationToken);

            if (calendarPermission is not null && 
                (calendarPermission.Access == Domain.Enums.CalendarAccess.CanOnlyRead || 
                calendarPermission.Access == Domain.Enums.CalendarAccess.CanReadAndModify))
            {
                filterEvents.Add(e);
            }
        }

        return filterEvents.Adapt<IEnumerable<EventResult>>();
    }
}
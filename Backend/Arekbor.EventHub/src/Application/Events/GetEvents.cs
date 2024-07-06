using Arekbor.EventHub.Application.Common.Interfaces;
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
    IEventRepository eventRepository
) : IRequestHandler<GetEvents, IEnumerable<EventResult>>
{
    public async Task<IEnumerable<EventResult>> Handle(GetEvents request, CancellationToken cancellationToken)
    {
        var events = await eventRepository
            .FindEventsAsync(request.Start, request.End, cancellationToken);

        return events.Adapt<IEnumerable<EventResult>>();
    }
}
using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Events;

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
    IEventRepository eventRepository
) : IRequestHandler<GetEvents, IEnumerable<EventResult>>
{
    public async Task<IEnumerable<EventResult>> Handle(GetEvents request, CancellationToken cancellationToken)
    {
        return await eventRepository
            .FindEventsAsync(currentUserService.GetId(), request.Start, request.End, cancellationToken);
    }
}
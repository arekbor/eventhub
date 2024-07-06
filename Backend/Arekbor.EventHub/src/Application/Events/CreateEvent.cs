using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.Events;

public record CreateEvent(
    EventBody EventBody
) : IRequest<Unit>;

public class CreateEventValidator : AbstractValidator<CreateEvent>
{
    public CreateEventValidator()
    {
        RuleFor(x => x.EventBody)
            .SetValidator(new EventBodyValidator());
    }
}

internal class CreateEventHandler(
    ICurrentUserService currentUserService,
    IEventRepository eventRepository
) : IRequestHandler<CreateEvent, Unit>
{
    public async Task<Unit> Handle(CreateEvent request, CancellationToken cancellationToken)
    {
        var e = request.EventBody.Adapt<Event>();

        e.UserId = currentUserService.GetId();
        await eventRepository.InsertAsync(e, cancellationToken);

        return Unit.Value;
    }
}
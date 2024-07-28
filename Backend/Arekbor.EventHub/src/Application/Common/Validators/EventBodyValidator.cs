using Arekbor.EventHub.Application.Common.Dtos;
using FluentValidation;

namespace Arekbor.TouchBase.Application.Common.Validators;

public class EventBodyValidator: AbstractValidator<EventBody>
{
    public EventBodyValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .NotNull()
            .MaximumLength(30)
            .WithMessage("{PropertyName} cannot contain more than 30 characters.");

        RuleFor(x => x.Start)
            .LessThanOrEqualTo(x => x.End);

        RuleFor(x => x.End)
            .GreaterThanOrEqualTo(x => x.Start);
    }
} 
 
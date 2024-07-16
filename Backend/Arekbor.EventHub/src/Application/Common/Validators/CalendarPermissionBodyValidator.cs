using Arekbor.EventHub.Application.Common.Dtos;
using FluentValidation;

namespace Arekbor.TouchBase.Application.Common.Validators;

public class CalendarPermissionBodyValidator: AbstractValidator<CalendarPermissionBody>
{
    public CalendarPermissionBodyValidator()
    {
        RuleFor(x => x.Access)
            .IsInEnum();
    }
} 
 
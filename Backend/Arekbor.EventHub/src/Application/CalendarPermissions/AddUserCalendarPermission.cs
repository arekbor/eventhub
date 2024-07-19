using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public record AddUserCalendarPermission(Guid UserId, CalendarPermissionBody CalendarPermissionBody) : IRequest<Unit>;

public class AddUserCalendarPermissionValidator : AbstractValidator<AddUserCalendarPermission>
{
    public AddUserCalendarPermissionValidator()
    {
        RuleFor(x => x.CalendarPermissionBody)
            .SetValidator(new CalendarPermissionBodyValidator());
    }
}

internal class AddUserCalendarPermissionHandler(
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<AddUserCalendarPermission, Unit>
{
    public async Task<Unit> Handle(AddUserCalendarPermission request, CancellationToken cancellationToken)
    {
        var currentId = currentUserService.GetId();

        var existingUser = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(request.UserId, currentId, cancellationToken);
            
        if(existingUser is not null)
            throw new BadRequestException($"User with id: {request.UserId} already has assigned permission.");

        var calendarPermission = new CalendarPermission
        {
            UserManagerId = currentId,
            UserId = request.UserId,
            Access = request.CalendarPermissionBody.Access
        };

        await calendarPermissionRepository
            .InsertAsync(calendarPermission, cancellationToken);

        return Unit.Value;
    }
}
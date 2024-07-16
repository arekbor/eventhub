using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public record UpdateUserCalendarPermission(Guid UserId, CalendarPermissionBody CalendarPermissionBody) : IRequest<Unit>;

public class UpdateUserCalendarPermissionValidator : AbstractValidator<UpdateUserCalendarPermission>
{
    public UpdateUserCalendarPermissionValidator()
    {
        RuleFor(x => x.CalendarPermissionBody)
            .SetValidator(new CalendarPermissionBodyValidator());
    }
}

internal class UpdateUserCalendarPermissionHandler(
    ICurrentUserService currentUserService,
    ICalendarPermissionRepository calendarPermissionRepository
) : IRequestHandler<UpdateUserCalendarPermission, Unit>
{
    public async Task<Unit> Handle(UpdateUserCalendarPermission request, CancellationToken cancellationToken)
    {
        var currentId = currentUserService.GetId();

        var calendarPermission = await calendarPermissionRepository
            .FindUserCalendarPermissionAsync(request.UserId, currentId, cancellationToken)
                ?? throw new NotFoundException($"Calendar permission of user ${currentId} not found");

        if(!calendarPermission.CanModify)
            throw new BadRequestException("Cannot modify this calendar permission");
        
        calendarPermission.Access = request.CalendarPermissionBody.Access;

        await calendarPermissionRepository
            .UpdateOneAsync(calendarPermission, cancellationToken);

        return Unit.Value;
    }
}
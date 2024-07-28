using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Consts;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.EventHub.Domain.Enums;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record RegisterUser
    (string Username, string Email, string Password, string ConfirmPassword) : IRequest<Unit>;

public class RegisterUserValidator : AbstractValidator<RegisterUser>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Username)
            .Username();
        
        RuleFor(x => x.Email)
            .EmailAddress();
        
        RuleFor(x => x.Password)
            .Password(); 

        RuleFor(x => x.ConfirmPassword)
            .ConfirmPassword(x => x.Password);
    }
}

internal class RegisterUserHandler(
    IUserRepository userRepository,
    ICalendarPermissionRepository calendarPermissionRepository,
    ICalendarSettingsRepository calendarSettingsRepository,
    IIdentityService identityService
) : IRequestHandler<RegisterUser, Unit>
{
    public async Task<Unit> Handle(RegisterUser request, CancellationToken cancellationToken)
    {
        var existingUser = await userRepository
            .FindByEmailAsync(request.Email, cancellationToken);
        if (existingUser is not null)
            throw new BadRequestException($"User with email: {request.Email} already exists.");
            
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = request.Username,
            Email = request.Email,
            Password = identityService.HashPassword(request.Password)
        };

        await userRepository
            .InsertAsync(user, cancellationToken);

        await InsertCalendarPermission(user.Id, cancellationToken);

        await InsertCalendarSettings(user.Id, cancellationToken);
 
        return Unit.Value;
    }

    private async Task InsertCalendarSettings(Guid userId, CancellationToken cancellationToken)
    {
        var calendarSettings = new Domain.Entities.CalendarSettings
        {
            UserId = userId,
            Color = new EventColor(
                Domain.Entities.CalendarSettings.GetRandomHex(), 
                Domain.Entities.CalendarSettings.GetRandomHex()
            ),
            CalendarView = CalendarView.Month,
        };

        await calendarSettingsRepository
            .InsertAsync(calendarSettings, cancellationToken);
    }

    private async Task InsertCalendarPermission(Guid userId, CancellationToken cancellationToken) {
        var calendarPermission = new CalendarPermission
        {
            UserManagerId = userId,
            UserId = userId,
            Access = CalendarAccess.CanReadAndModify
        };

        await calendarPermissionRepository
            .InsertAsync(calendarPermission, cancellationToken);
    }
}
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
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

        var calendarPermission = new CalendarPermission
        {
            UserManagerId = user.Id,
            UserId = user.Id,
            Access = CalendarAccess.CanReadAndModify
        };

        await calendarPermissionRepository
            .InsertAsync(calendarPermission, cancellationToken);
 
        return Unit.Value;
    }
}
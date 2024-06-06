using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record RegisterUserCommand(string Username, string Email, string Password) : IRequest<Unit>;

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(x => x.Username)
            .Username();
        
        RuleFor(x => x.Email)
            .EmailAddress();
        
        RuleFor(x => x.Password)
            .Password();
    }
}

internal class RegisterUserCommandHandler(
    IUnitOfWork unitOfWork,
    IUserRepository userRepository,
    IIdentityService identityService
) : IRequestHandler<RegisterUserCommand, Unit>
{
    public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(request.Email, cancellationToken);
        if (user is not null)
            throw new BadRequestException($"User with email: {request.Email} already exists");

        var newUser = new User
        {
            Username = request.Username,
            Email = request.Email,
            Password = identityService.HashPassword(request.Password)
        };

        await userRepository.AddAsync(newUser, cancellationToken);
 
        await unitOfWork.CommitAsync(cancellationToken);

        return Unit.Value;
    }
}
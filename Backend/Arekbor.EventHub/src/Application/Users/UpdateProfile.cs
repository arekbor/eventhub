using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record UpdateProfile(string Email, string Username): IRequest<Unit>;

public class UpdateProfileValidator : AbstractValidator<UpdateProfile> 
{
    public UpdateProfileValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress();

        RuleFor(x => x.Username)
            .Username();
    }
}

internal class UpdateProfileHandler(
    ICurrentUserService currentUserService,
    IUserRepository userRepository
) : IRequestHandler<UpdateProfile, Unit>
{
    public async Task<Unit> Handle(UpdateProfile request, CancellationToken cancellationToken)
    {
        var user = await userRepository
            .FindAsync(currentUserService.GetId(), cancellationToken)
                ?? throw new NotFoundException($"User {currentUserService.GetId()} not found.");

        if (user.Username.Equals(request.Username) && user.Email.Equals(request.Email))
            throw new BadRequestException("No changes detected.");

        var userWithSameEmail = await userRepository
            .FindByEmailAsync(request.Email, cancellationToken);

        if (userWithSameEmail?.Email is not null && !userWithSameEmail.Email.Equals(user.Email))
            throw new BadRequestException($"User with email: {request.Email} already exists.");

        user.Username = request.Username;
        user.Email = request.Email;

        await userRepository.UpdateOneAsync(user, cancellationToken);

        return Unit.Value;
    }
}
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.TouchBase.Application.Common.Validators;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record UpdatePassword(string CurrentPassword, string NewPassword, string ConfirmNewPassword) : IRequest<Unit>;

public class UpdatePasswordValidator : AbstractValidator<UpdatePassword> 
{
    public UpdatePasswordValidator()
    {
        RuleFor(x => x.CurrentPassword)
            .NotEmpty()
            .NotNull();

        RuleFor(x => x.NewPassword)
            .Password();

        RuleFor(x => x.ConfirmNewPassword)
            .ConfirmPassword(x => x.NewPassword);
    }
}

internal class UpdatePasswordHandler(
    ICurrentUserService currentUserService,
    IUserRepository userRepository,
    IIdentityService identityService
) : IRequestHandler<UpdatePassword, Unit>
{
    public async  Task<Unit> Handle(UpdatePassword request, CancellationToken cancellationToken)
    {
        var user = await userRepository
            .FindAsync(currentUserService.GetId(), cancellationToken)
                ??  throw new NotFoundException($"User ${currentUserService.GetId()} not found.");
        
        if (!identityService.VerifyPasswordHash(user.Password, request.CurrentPassword))
            throw new BadRequestException("Invalid current password.");

        user.Password = identityService.HashPassword(request.NewPassword);

        await userRepository.UpdateAsync(user, cancellationToken);

        return Unit.Value;
    }
}

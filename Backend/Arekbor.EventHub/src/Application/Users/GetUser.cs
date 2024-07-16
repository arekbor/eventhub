using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record UserResult(string Email, string Username);

public record GetUser : IRequest<UserResult>;

internal class GetUserHandler(
    ICurrentUserService currentUserService,
    IUserRepository userRepository
) : IRequestHandler<GetUser, UserResult>
{
    public async Task<UserResult> Handle(GetUser request, CancellationToken cancellationToken)
    {
        var user = await userRepository
            .FindAsync(currentUserService.GetId(), cancellationToken)
                ?? throw new NotFoundException("Current user not found.");

        return user.Adapt<UserResult>();
    }
}
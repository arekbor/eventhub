using Arekbor.EventHub.Application.Common.Interfaces;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record SearchUserResult(Guid Id, string Email, string Username);

public record SearchByEmail(string Email) : IRequest<IEnumerable<SearchUserResult>>;

internal class SearchByEmailHandler(
    IUserRepository userRepository
) : IRequestHandler<SearchByEmail, IEnumerable<SearchUserResult>>
{
    public async Task<IEnumerable<SearchUserResult>> Handle(SearchByEmail request, CancellationToken cancellationToken)
    {
        var users = await userRepository
            .SearchByEmailAsync(request.Email, cancellationToken);

        return users.Adapt<IEnumerable<SearchUserResult>>();
    }
}
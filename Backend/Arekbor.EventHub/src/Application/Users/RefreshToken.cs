using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record RefreshToken(string? Token) : IRequest<TokensResult>;

internal class RefreshTokenHandler(
    IIdentityService identityService,
    IUserRepository userRepository,
    ICacheManager<Domain.Entities.RefreshToken> cacheManager
) : IRequestHandler<RefreshToken, TokensResult>
{
    public async Task<TokensResult> Handle(RefreshToken request, CancellationToken cancellationToken)
    {
        if (request.Token is null)
            throw new UnauthorizedException();

        var oldRefreshToken = await cacheManager
            .GetAsync(request.Token, cancellationToken)
                ?? throw new UnauthorizedException();

        await cacheManager.RemoveAsync(request.Token, cancellationToken);

        var user = await userRepository
            .FindAsync(oldRefreshToken.UserId, cancellationToken)
                ?? throw new UnauthorizedException();

        var accessToken = identityService.GetAccessToken(user);
        var refreshToken = identityService.GetRefreshToken(user);

        await cacheManager.SetAsync(
            refreshToken.Token, 
            refreshToken, 
            refreshToken.TotalExpirationSeconds,
            cancellationToken);

        return new TokensResult(accessToken, refreshToken.Token);
    }
}
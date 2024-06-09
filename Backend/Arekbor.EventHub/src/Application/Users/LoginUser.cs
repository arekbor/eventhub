using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace Arekbor.EventHub.Application.Users;

public record LoginUser(string Email, string Password) : IRequest<TokensResult>;

public class LoginUserValidator : AbstractValidator<LoginUser>
{
    public LoginUserValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .NotNull();
    }
}

internal class LoginUserHandler(
    IUserRepository userRepository,
    IIdentityService identityService,
    ICacheManager<Domain.Entities.RefreshToken> cacheManager
) : IRequestHandler<LoginUser, TokensResult>
{
    public async Task<TokensResult> Handle(LoginUser request, CancellationToken cancellationToken)
    {
        var user = await userRepository
            .FindByEmailAsync(request.Email, cancellationToken)
                ?? throw new BadRequestException("Invalid email or password.");
        
        if (!identityService.VerifyPasswordHash(user.Password, request.Password))
            throw new BadRequestException("Invalid email or password.");

        var accessToken = identityService.GetAccessToken(user)
            ?? throw new BadRequestException();
        
        var refreshToken = identityService.GetRefreshToken(user)
            ?? throw new BadRequestException();

        await cacheManager.SetAsync(
            refreshToken.Token, 
            refreshToken, 
            refreshToken.GetExpirationSeconds, 
            cancellationToken);

        return new TokensResult(accessToken, refreshToken.Token);
    }
}
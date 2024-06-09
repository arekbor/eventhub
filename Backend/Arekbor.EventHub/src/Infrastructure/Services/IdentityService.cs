using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Arekbor.EventHub.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Arekbor.EventHub.Infrastructure.Services;

public class IdentityService(IOptions<IdentityTokensOptions> options) : IIdentityService
{
    private readonly IdentityTokensOptions _options = options.Value;

    public string GetAccessToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username ?? string.Empty),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
        };

        var identity = new ClaimsIdentity(claims);
        var principal = new ClaimsPrincipal(identity);

        var key = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(_options.AccessTokenSecretKey));
        
        var secret = new SigningCredentials
            (key, SecurityAlgorithms.HmacSha256Signature);

        var descriptor = new SecurityTokenDescriptor
        {
            Subject = (ClaimsIdentity)principal.Identity!,
            Expires = DateTime.Now.AddSeconds(_options.AccessTokenExpiresInSeconds),
            Audience = _options.AccessTokenAudience,
            Issuer = _options.AccessTokenIssuer,
            SigningCredentials = secret
        };

        var handler = new JwtSecurityTokenHandler();
        var token = handler.CreateToken(descriptor);

        return handler.WriteToken(token);;
    }

    public RefreshToken GetRefreshToken(User user)
    {
        var tokenBuilder = new StringBuilder();

        for(var i = 0; i <= 5; i++)
            tokenBuilder.Append(Guid.NewGuid());

        return new RefreshToken{
            UserId = user.Id,
            Token = tokenBuilder.ToString(),
            Expires = DateTime.UtcNow.AddSeconds(_options.RefreshTokenExpiresInSeconds),
        };
    }

    public string HashPassword(string password)
        => BCrypt.Net.BCrypt.HashPassword(password);

    public bool VerifyPasswordHash(string hash, string password)
        => BCrypt.Net.BCrypt.Verify(password, hash); 
}
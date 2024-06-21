using System.ComponentModel.DataAnnotations;

namespace Arekbor.EventHub.Infrastructure.Options;

public class IdentityTokensOptions
{
    [Required]
    public required string AccessTokenSecretKey { get; set; }
    [Required]
    public required string AccessTokenIssuer { get; set; }
    [Required]
    public required string AccessTokenAudience { get; set; }
    [Required]
    [Range(10, 3600)]
    public required int AccessTokenExpiresInSeconds { get; set; }
    [Required]
    [Range(10, 604_800)]
    public required int RefreshTokenExpiresInSeconds { get; set; }
}
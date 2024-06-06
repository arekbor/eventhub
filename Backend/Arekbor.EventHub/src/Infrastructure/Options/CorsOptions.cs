using System.ComponentModel.DataAnnotations;

namespace Arekbor.EventHub.Infrastructure.Options;

public class CorsOptions
{
    public const string Position = "Cors";

    [Required]
    public required string AllowedOrigins { get; init; }
    [Required]
    public required string AllowedMethods { get; init; }
    [Required]
    public required string AllowedHeaders { get; init; }
    [Required]
    public required bool AllowCredentials { get; init; }
    [Range(0, 100000)]
    [Required]
    public required int MaxAgeInSeconds { get; init; }
}
using System.ComponentModel.DataAnnotations;

namespace Arekbor.EventHub.Infrastructure.Options;

public class RedisOptions
{
    [Required]
    public required string Configuration { get; set; }
}

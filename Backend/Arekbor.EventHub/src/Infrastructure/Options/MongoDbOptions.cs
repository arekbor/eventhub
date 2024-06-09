using System.ComponentModel.DataAnnotations;

namespace Arekbor.EventHub.Infrastructure.Options;

public class MongoDbOptions
{
    [Required]
    public required string ConnectionUri { get; set; }
    [Required]
    public required string DatabaseName { get; set;}
}

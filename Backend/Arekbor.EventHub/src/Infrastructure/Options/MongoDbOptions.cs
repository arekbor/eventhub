using System.ComponentModel.DataAnnotations;

namespace Arekbor.EventHub.Infrastructure.Options;

public class MongoDbOptions
{
    public const string Position = "MongoDb";

    [Required]
    public required string ConnectionString { get; set; }
    [Required]
    public required string DatabaseName { get; set;}
}

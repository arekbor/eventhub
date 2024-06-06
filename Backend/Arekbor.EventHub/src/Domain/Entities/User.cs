using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Domain.Entities;

public class User : BaseEntity
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}
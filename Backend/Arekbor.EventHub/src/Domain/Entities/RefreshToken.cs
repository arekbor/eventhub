namespace Arekbor.EventHub.Domain.Entities;

public class RefreshToken
{
    public Guid UserId { get; set; }
    public required string Token { get; set; }
    public DateTime Expires { get; set; }

    public double TotalExpirationSeconds
        => (Expires - DateTime.UtcNow).TotalSeconds;
}
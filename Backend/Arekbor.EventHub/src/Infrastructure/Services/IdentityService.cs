using Arekbor.EventHub.Application.Common.Interfaces;

namespace Arekbor.EventHub.Infrastructure.Services;

public class IdentityService : IIdentityService
{
    public string HashPassword(string password)
        => BCrypt.Net.BCrypt.HashPassword(password);

    public bool VerifyPasswordHash(string hash, string password)
        => BCrypt.Net.BCrypt.Verify(password, hash);
}
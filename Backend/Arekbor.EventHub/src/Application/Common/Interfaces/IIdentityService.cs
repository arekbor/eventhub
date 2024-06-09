using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IIdentityService
{
    string HashPassword(string password);
    bool VerifyPasswordHash(string hash, string password);
    string GetAccessToken(User user);
    RefreshToken GetRefreshToken(User user);
}
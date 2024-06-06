namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IIdentityService
{
    string HashPassword(string password);
    bool VerifyPasswordHash(string hash, string password);
}
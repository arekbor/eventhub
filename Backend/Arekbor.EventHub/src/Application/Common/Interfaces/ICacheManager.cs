namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface ICacheManager<TValue>
{
    Task SetAsync
        (string key, TValue value, double expirationInSeconds, CancellationToken cancellationToken);
    Task<TValue?> GetAsync(string key, CancellationToken cancellationToken);
    Task RemoveAsync(string key, CancellationToken cancellationToken);
}
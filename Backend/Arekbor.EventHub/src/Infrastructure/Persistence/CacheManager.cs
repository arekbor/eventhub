using Arekbor.EventHub.Application.Common.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace Arekbor.EventHub.Infrastructure.Persistence.Caches;

public class CacheManager<TValue>(
    IDistributedCache cache
) : ICacheManager<TValue>
{
    private readonly Func<string, string> _keyCache = (key) => $"{typeof(TValue).Name}:{key}";

    public async Task<TValue?> GetAsync(string key, CancellationToken cancellationToken)
    {
        var data = await cache.GetStringAsync(_keyCache(key), cancellationToken);
        return data is null ? default : JsonConvert.DeserializeObject<TValue>(data);
    }

    public Task RemoveAsync(string key, CancellationToken cancellationToken)
        => cache.RemoveAsync(_keyCache(key), cancellationToken);

    public Task SetAsync
        (string key, TValue value, double expirationInSeconds, CancellationToken cancellationToken)
    {
        var data = JsonConvert.SerializeObject(value);

        var options = new DistributedCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(expirationInSeconds));
            
        return cache.SetStringAsync(_keyCache(key), data, options, cancellationToken);
    }
}
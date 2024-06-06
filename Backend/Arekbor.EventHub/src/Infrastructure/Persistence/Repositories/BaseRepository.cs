using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class BaseRepository<TEntity>(MongoDbContext mongoDbContext) : IBaseRepository<TEntity>
    where TEntity : BaseEntity
{
    protected readonly MongoDbContext MongoDbContext = mongoDbContext;

    public Task AddAsync(TEntity entity, CancellationToken cancellationToken)
        => Task.FromResult(MongoDbContext.Set<TEntity>()
            .AddAsync(entity, cancellationToken).AsTask());

}
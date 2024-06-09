using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Common;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class BaseRepository<TEntity>(
    MongoDbContext mongoDbContext) : IBaseRepository<TEntity>
        where TEntity : BaseEntity
{
    protected readonly MongoDbContext MongoDbContext = mongoDbContext;

    public Task<TEntity?> FindAsync(Guid userId, CancellationToken cancellationToken)
    {
        var cursor = MongoDbContext.Collection<TEntity>()
            .FindAsync<TEntity>(Builders<TEntity>.Filter
                .Eq(x => x.Id, userId), cancellationToken: cancellationToken);

        return cursor.Result.FirstOrDefaultAsync(cancellationToken)!;
    }

    public Task InsertAsync(TEntity entity, CancellationToken cancellationToken)
        => MongoDbContext.Collection<TEntity>()
            .InsertOneAsync(entity, cancellationToken: cancellationToken);
}
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
        var filter = Builders<TEntity>.Filter.Eq(x => x.Id, userId);

        return MongoDbContext.Collection<TEntity>()
            .Find(filter)
            .FirstOrDefaultAsync(cancellationToken)!;
    }

    public Task InsertAsync(TEntity entity, CancellationToken cancellationToken)
        => MongoDbContext.Collection<TEntity>()
            .InsertOneAsync(entity, cancellationToken: cancellationToken);
}
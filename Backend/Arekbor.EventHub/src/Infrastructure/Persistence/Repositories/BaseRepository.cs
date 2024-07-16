using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Common;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class BaseRepository<TEntity>(
    MongoDbContext mongoDbContext) : IBaseRepository<TEntity>
        where TEntity : BaseEntity
{
    protected readonly MongoDbContext MongoDbContext = mongoDbContext;

    public Task DeleteOneAsync(TEntity entity, CancellationToken cancellationToken)
        => MongoDbContext.Collection<TEntity>()
            .DeleteOneAsync(x => x.Id == entity.Id, cancellationToken: cancellationToken);

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

    public Task UpdateOneAsync(TEntity entity, CancellationToken cancellationToken)
        => MongoDbContext.Collection<TEntity>()
            .ReplaceOneAsync(d => d.Id == entity.Id, entity, cancellationToken: cancellationToken);

    public async Task<PaginatedList<TEntity>> PaginatedList(int pageNumber, int pageSize, CancellationToken cancellationToken)
    {
        const int MaxPageSize = 10;

        pageNumber = pageNumber <= 0 ? 1 : pageNumber;
        pageSize = pageSize <= 0 ? 1 : pageSize;
        pageSize = pageSize > MaxPageSize ? MaxPageSize : pageSize;

        var count = await MongoDbContext.Collection<TEntity>()
            .EstimatedDocumentCountAsync(cancellationToken: cancellationToken); 

        var items = await MongoDbContext.Collection<TEntity>()
            .Find(x => true)
            .Skip((pageNumber -1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(cancellationToken);

        return new PaginatedList<TEntity>(items, count, pageNumber, pageSize);
    }
}
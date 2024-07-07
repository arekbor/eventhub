using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IBaseRepository<TEntity>
    where TEntity : BaseEntity
{
    Task InsertAsync(TEntity entity, CancellationToken cancellationToken);
    Task<TEntity?> FindAsync(Guid id, CancellationToken cancellationToken);
    Task UpdateOneAsync(TEntity entity, CancellationToken cancellationToken);
    Task DeleteOneAsync(TEntity entity, CancellationToken cancellationToken);
}
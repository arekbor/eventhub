using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IBaseRepository<TEntity>
    where TEntity : BaseEntity
{
    Task InsertAsync(TEntity entity, CancellationToken cancellationToken);
    Task<TEntity?> FindAsync(Guid id, CancellationToken cancellationToken);
    Task UpdateAsync(TEntity entity, CancellationToken cancellationToken);
    Task DeleteAsync(TEntity entity, CancellationToken cancellationToken);
}
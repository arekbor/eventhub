using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IBaseRepository<TEntity>
    where TEntity : BaseEntity
{
    Task InsertAsync(TEntity document, CancellationToken cancellationToken);
    Task<TEntity?> FindAsync(Guid userId, CancellationToken cancellationToken);
}
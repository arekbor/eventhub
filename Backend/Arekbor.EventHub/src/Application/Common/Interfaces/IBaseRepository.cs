using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IBaseRepository<TEntity>
    where TEntity : BaseEntity
{
    Task AddAsync(TEntity entity, CancellationToken cancellationToken);
}
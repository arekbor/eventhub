using Arekbor.EventHub.Application.Common.Interfaces;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class UnitOfWork(MongoDbContext mongoDbContext) : IUnitOfWork
{
    public Task CommitAsync(CancellationToken cancellationToken)
        => mongoDbContext.SaveChangesAsync(cancellationToken);
}
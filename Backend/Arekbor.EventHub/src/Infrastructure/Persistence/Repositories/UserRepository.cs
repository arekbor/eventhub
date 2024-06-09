using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class UserRepository(
    MongoDbContext mongoDbContext) : BaseRepository<User>(mongoDbContext), IUserRepository
{
    public Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var cursor = MongoDbContext.Collection<User>()
            .FindAsync<User>(Builders<User>.Filter
                .Eq(x => x.Email, email), cancellationToken: cancellationToken);

        return cursor.Result.FirstOrDefaultAsync(cancellationToken)!;
    }
}
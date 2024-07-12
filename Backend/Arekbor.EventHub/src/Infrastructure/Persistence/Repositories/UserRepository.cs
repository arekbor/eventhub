using System.Text.RegularExpressions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class UserRepository(
    MongoDbContext mongoDbContext) : BaseRepository<User>(mongoDbContext), IUserRepository
{
    public Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Email, email);

        return MongoDbContext.Collection<User>().Find(filter)
            .FirstOrDefaultAsync(cancellationToken)!;
    }

    public Task<List<User>> SearchManyByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var filter = Builders<User>.Filter
            .Regex(x => x.Email, BsonRegularExpression.Create(Regex.Escape(email)));

        return MongoDbContext.Collection<User>().Find(filter)
            .ToListAsync(cancellationToken);
    }
}
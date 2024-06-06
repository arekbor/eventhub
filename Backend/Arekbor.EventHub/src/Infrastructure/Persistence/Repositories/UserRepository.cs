using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class UserRepository(
    MongoDbContext mongoDbContext) : BaseRepository<User>(mongoDbContext), IUserRepository
{
    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken)
        => MongoDbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
}
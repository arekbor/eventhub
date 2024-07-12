using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Interfaces;

public interface IUserRepository : IBaseRepository<User>
{
    Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken);
    Task<List<User>> SearchManyByEmailAsync(string email, CancellationToken cancellationToken);
}
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Entities;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class CalendarPermissionRepository(
    MongoDbContext mongoDbContext
) : BaseRepository<CalendarPermission>(mongoDbContext), ICalendarPermissionRepository
{
    public Task<CalendarPermission> FindUserCalendarPermissionAsync(
        Guid userId, Guid userManagerId, CancellationToken cancellationToken)
    {
        return MongoDbContext.Collection<CalendarPermission>()
            .Find(x => x.UserManagerId == userManagerId && x.UserId == userId)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public Task<PaginatedList<CalendarPermission>> FindUserCalendarPermissionsAsync(
        Guid userManagerId, int pageNumber, int pageSize, CancellationToken cancellationToken)
    {
        return MongoDbContext.Collection<CalendarPermission>()
            .Find(x => x.UserManagerId == userManagerId)
            .ToPaginatedListAsync(pageNumber, pageSize, cancellationToken);
    }
}
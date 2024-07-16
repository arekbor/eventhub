using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Common;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence;

public static class QueryableExtension
{
    private const int MaxPageSize = 10;

    public static async Task<PaginatedList<TDestination>> ToPaginatedListAsync<TDestination>
        (this IFindFluent<TDestination, TDestination> find, int pageNumber, int pageSize, CancellationToken cancellationToken) 
            where TDestination : BaseEntity
    {
        pageNumber = pageNumber <= 0 ? 1 : pageNumber;
        pageSize = pageSize <= 0 ? 1 : pageSize;
        pageSize = pageSize > MaxPageSize ? MaxPageSize : pageSize;

        var count = await find.CountDocumentsAsync(cancellationToken);

        var items = await find
            .Skip((pageNumber -1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(cancellationToken);

        return new PaginatedList<TDestination>(items, count, pageNumber, pageSize);
    }
}
using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence;

public class PaginatedQuery
{
    private const int MaxPageSize = 10;

    public static async Task<PaginatedList<TResult>> PaginateAsync<TDocument, TResult>(
        IMongoCollection<TDocument> collection,
        BsonDocument[] pipelines,
        int pageNumber,
        int pageSize,
        CancellationToken cancellationToken)
        where TDocument : BaseEntity
    {
        pageNumber = pageNumber <= 0 ? 1 : pageNumber;
        pageSize = pageSize <= 0 ? 1 : pageSize;
        pageSize = pageSize > MaxPageSize ? MaxPageSize : pageSize;

        var paginationPipeline = pipelines.Concat(
        [
            new BsonDocument("$facet", new BsonDocument
            {
                { "totalCount", new BsonArray
                    {
                        new BsonDocument("$count", "count")
                    }
                },
                
                { "results", new BsonArray
                    {
                        new BsonDocument("$skip", (pageNumber -1) * pageSize),
                        new BsonDocument("$limit", pageSize)
                    }
                }
            })
        ]).ToArray();

        var result = await collection
            .Aggregate<BsonDocument>(paginationPipeline, cancellationToken: cancellationToken)
            .FirstOrDefaultAsync(cancellationToken);

        var totalCount = result["totalCount"]
            .AsBsonArray.FirstOrDefault()?["count"].AsInt32 ?? 0;

        var documents = result["results"].AsBsonArray
            .Select(doc => BsonSerializer.Deserialize<TResult>(doc.AsBsonDocument))
            .ToList();

        return new PaginatedList<TResult>(documents, totalCount, pageNumber, pageSize);
    }
}
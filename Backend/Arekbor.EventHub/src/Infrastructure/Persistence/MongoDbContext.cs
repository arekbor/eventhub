using Arekbor.EventHub.Domain.Entities;
using Arekbor.EventHub.Infrastructure.Options;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Arekbor.EventHub.Infrastructure.Persistence;

public class MongoDbContext
{
    private readonly MongoDbOptions _options;
    private readonly IMongoDatabase _mongoDatabase;

    public IMongoCollection<TDocument> Collection<TDocument>()
        => _mongoDatabase.GetCollection<TDocument>(name: $"{typeof(TDocument).Name.ToLower()}s");
        
    public MongoDbContext(IOptions<MongoDbOptions> options)
    {
        _options = options.Value;

        BsonSerializer.RegisterSerializer(new GuidSerializer(BsonType.String));

        var client = new MongoClient(_options.ConnectionUri);
        _mongoDatabase = client.GetDatabase(_options.DatabaseName);

        //Create unique index for Users email field
        var indexOptions = new CreateIndexOptions() { Unique = true };
        var field = new StringFieldDefinition<User>(nameof(User.Email));
        var indexDefinition = new IndexKeysDefinitionBuilder<User>().Ascending(field);
        var indexModel = new CreateIndexModel<User>(indexDefinition, indexOptions);
        Collection<User>().Indexes.CreateOneAsync(indexModel);
    }
}
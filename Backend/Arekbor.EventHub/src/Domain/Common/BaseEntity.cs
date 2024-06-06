using MongoDB.Bson;

namespace Arekbor.EventHub.Domain.Common;

public abstract class BaseEntity
{
    public ObjectId Id { get; set; }
}
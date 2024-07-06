using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Domain.Entities;

public class Event : BaseEntity 
{
    public required string Title { get; set; }
    public bool AllDay { get; set; }
    public DateTime Start { get; set; }
    public DateTime? End { get; set; }
    public string? Description { get; set; }
    public Guid UserId { get; set; }
}
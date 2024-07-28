using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Application.Common.Dtos;

public record EventResult(
    Guid Id, 
    string Title, 
    bool AllDay, 
    DateTime Start, 
    DateTime? End, 
    string? Description, 
    string UserId,
    EventColor Color
);
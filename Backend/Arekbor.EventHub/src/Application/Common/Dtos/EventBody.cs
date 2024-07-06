namespace Arekbor.EventHub.Application.Common.Dtos;

public record EventBody(
    string Title, 
    bool AllDay, 
    DateTime Start, 
    DateTime? End, 
    string? Description
);
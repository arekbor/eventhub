namespace Arekbor.EventHub.Application.Common.Dtos;

public record CalendarEventBody(
    string Title, bool AllDay, DateTime Start, DateTime? End, string? Meta
);
using Arekbor.EventHub.Domain.Enums;

namespace Arekbor.EventHub.Application.Common.Dtos;

public class CalendarPermissionResult
{
    public Guid UserId { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public CalendarAccess Access { get; set; }
}
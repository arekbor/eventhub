using Arekbor.EventHub.Domain.Enums;

namespace Arekbor.EventHub.Application.Common.Dtos;

public record CalendarPermissionBody(
    CalendarAccess Access
);
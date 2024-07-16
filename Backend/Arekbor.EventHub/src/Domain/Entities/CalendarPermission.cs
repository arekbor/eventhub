using Arekbor.EventHub.Domain.Common;
using Arekbor.EventHub.Domain.Enums;

namespace Arekbor.EventHub.Domain.Entities;

public class CalendarPermission : BaseEntity
{
    public Guid UserManagerId { get; set; }
    public Guid UserId { get; set; }
    public CalendarAccess Access { get; set; }
    public bool CanModify 
        => UserManagerId != UserId;
}
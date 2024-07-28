using Arekbor.EventHub.Domain.Common;

namespace Arekbor.EventHub.Domain.Entities;

public class CalendarSettings : BaseEntity
{
    public Guid UserId { get; set; }
    public required EventColor Color { get; set; }
    public required string CalendarView { get; set; }
    public static string GetRandomHex() 
        => string.Format("#{0:X6}", new Random().Next(0x1000000));
}
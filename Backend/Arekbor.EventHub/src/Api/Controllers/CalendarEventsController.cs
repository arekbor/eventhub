using Arekbor.EventHub.Application.CalendarEvents;
using Arekbor.EventHub.Application.Common.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Arekbor.EventHub.Api.Controllers;

public class CalendarEventsController : BaseApiController
{
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CalendarEventBody calendarEventBody, CancellationToken cancellationToken)
        => await Send(new CreateCalendarEvent(calendarEventBody), cancellationToken);

    [HttpGet("list")]
    public async Task<IActionResult> List([FromQuery] GetCalendarEvents getCalendarEvents, CancellationToken cancellationToken)
        => await Send(getCalendarEvents, cancellationToken);
}
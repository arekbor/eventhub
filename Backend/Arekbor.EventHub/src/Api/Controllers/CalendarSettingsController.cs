using Arekbor.EventHub.Application.CalendarSettings;
using Microsoft.AspNetCore.Mvc;

namespace Arekbor.EventHub.Api.Controllers;

public class CalendarSettingsController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetCalendarSettings(CancellationToken cancellationToken)
        => await Send(new GetCalendarSettings(), cancellationToken);

    [HttpPut]
    public async Task<IActionResult> UpdateCalendarSettings([FromBody] CalendarSettingsBody body, CancellationToken cancellationToken)
        => await Send(new UpdateCalendarSettings(body), cancellationToken);
}
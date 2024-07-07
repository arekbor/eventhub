using Arekbor.EventHub.Application.Common.Dtos;
using Arekbor.EventHub.Application.Events;
using Microsoft.AspNetCore.Mvc;

namespace Arekbor.EventHub.Api.Controllers;

public class EventsController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EventBody eventBody, CancellationToken cancellationToken)
        => await Send(new CreateEvent(eventBody), cancellationToken);

    [HttpPut]
    public async Task<IActionResult> Update(Guid id, [FromBody] EventBody eventBody, CancellationToken cancellationToken)
        => await Send(new UpdateEvent(id, eventBody), cancellationToken);

    [HttpDelete]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await Send(new DeleteEvent(id), cancellationToken);

    [HttpGet("list")]
    public async Task<IActionResult> List([FromQuery] GetEvents getEvents, CancellationToken cancellationToken)
        => await Send(getEvents, cancellationToken);
}
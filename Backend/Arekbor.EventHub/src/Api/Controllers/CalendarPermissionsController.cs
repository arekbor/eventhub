using Arekbor.EventHub.Application.CalendarPermissions;
using Arekbor.EventHub.Application.Common.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Arekbor.EventHub.Api.Controllers;

public class CalendarPermissionsController : BaseApiController
{
    [HttpGet("list")]
    public async Task<IActionResult> GetUserCalendarPermissions(int pageNumber, int pageSize, CancellationToken cancellationToken)
        => await Send(new GetCalendarPermissions(pageNumber, pageSize), cancellationToken);

    [HttpGet("access")]
    public async Task<IActionResult> GetUserManagerAccess(Guid userManagerId, CancellationToken cancellationToken)
        => await Send(new GetUserManagerAccess(userManagerId), cancellationToken);

    [HttpPost]
    public async Task<IActionResult> Add(Guid userId, [FromBody] CalendarPermissionBody calendarPermissionBody, CancellationToken cancellationToken)
        => await Send(new AddUserCalendarPermission(userId, calendarPermissionBody), cancellationToken);

    [HttpPut]
    public async Task<IActionResult> Update(Guid userId, [FromBody] CalendarPermissionBody calendarPermissionBody, CancellationToken cancellationToken)
        => await Send(new UpdateUserCalendarPermission(userId, calendarPermissionBody), cancellationToken);

    [HttpDelete]
    public async Task<IActionResult> Remove(Guid userId, CancellationToken cancellationToken)
        => await Send(new RemoveUserCalendarPermission(userId), cancellationToken);
}
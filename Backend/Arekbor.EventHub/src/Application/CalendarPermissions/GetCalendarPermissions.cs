using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Application.Common.Models;
using Arekbor.EventHub.Domain.Enums;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarPermissions;

public class CalendarPermissionResult
{
    public Guid UserId { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public CalendarAccess Access { get; set; }
    public bool CanModify { get; set; }
}

public record GetCalendarPermissions(int PageNumber, int PageSize) : IRequest<PaginatedList<CalendarPermissionResult>>;

internal class GetCalendarPermissionsHandler(
    ICalendarPermissionRepository calendarPermissionRepository,
    IUserRepository userRepository,
    ICurrentUserService currentUserService
) : IRequestHandler<GetCalendarPermissions, PaginatedList<CalendarPermissionResult>>
{
    public async Task<PaginatedList<CalendarPermissionResult>> Handle(GetCalendarPermissions request, CancellationToken cancellationToken)
    {
        var pagiantedList = await calendarPermissionRepository
            .FindAllUserCalendarPermissionsAsync(
                currentUserService.GetId(), request.PageNumber, request.PageSize, cancellationToken);

        var result = pagiantedList
            .Adapt<PaginatedList<CalendarPermissionResult>>();

        var resultList = result.Items.ToList();

        foreach(var item in resultList) {
            var user = await userRepository
                .FindAsync(item.UserId, cancellationToken)
                    ?? throw new NotFoundException($"{item.UserId} not found");
            
            item.Username = user.Username;
            item.Email = user.Email;
        }

        result.Items = resultList;

        return result;
    }
}
using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarSettings;

public record CalendarSettingsResult(
    string PrimaryColor,
    string SecondaryColor,
    string CalendarView
);

public record GetCalendarSettings : IRequest<CalendarSettingsResult>;

internal class GetCalendarSettingsHandler(
    ICurrentUserService currentUserService,
    ICalendarSettingsRepository calendarSettingsRepository
) : IRequestHandler<GetCalendarSettings, CalendarSettingsResult>
{
    public async Task<CalendarSettingsResult> Handle(GetCalendarSettings request, CancellationToken cancellationToken)
    {   
        var userId = currentUserService.GetId();

        var calendarSettings = await calendarSettingsRepository
            .FindCalendarSettings(userId, cancellationToken)
                ?? throw new NotFoundException($"Calendar settings of user: {userId} not found.");

        return calendarSettings.Adapt<CalendarSettingsResult>();
    }
}
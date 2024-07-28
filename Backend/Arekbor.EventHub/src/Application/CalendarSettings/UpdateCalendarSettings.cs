using Arekbor.EventHub.Application.Common.Exceptions;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;
using FluentValidation;
using Mapster;
using MediatR;

namespace Arekbor.EventHub.Application.CalendarSettings;

public record CalendarSettingsBody(
    EventColor Color,
    string CalendarView
);

public record UpdateCalendarSettings(CalendarSettingsBody Body) : IRequest<Unit>;

public class UpdateCalendarSettingsValidator : AbstractValidator<UpdateCalendarSettings>
{
    public UpdateCalendarSettingsValidator()
    {
        RuleFor(x => x.Body.CalendarView)
            .NotEmpty()
            .NotNull();

        RuleFor(x => x.Body.Color)
            .NotEmpty()
            .NotNull();
    }
}

internal class UpdateCalendarSettingsHandler(
    ICurrentUserService currentUserService,
    ICalendarSettingsRepository calendarSettingsRepository
) : IRequestHandler<UpdateCalendarSettings, Unit>
{
    public async Task<Unit> Handle(UpdateCalendarSettings request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.GetId();

        var calendarSettings = await calendarSettingsRepository
            .FindCalendarSettings(userId, cancellationToken)
                ?? throw new NotFoundException($"Calendar settings of user: {userId} not found.");

        calendarSettings = request.Body.Adapt(calendarSettings);

        await calendarSettingsRepository
            .UpdateAsync(calendarSettings, cancellationToken);

        return Unit.Value;
    }
}

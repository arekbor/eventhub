using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Domain.Entities;

namespace Arekbor.EventHub.Infrastructure.Persistence.Repositories;

public class CalendarEventRepository(
    MongoDbContext mongoDbContext) : BaseRepository<CalendarEvent>(mongoDbContext), ICalendarEventRepository
{
    
}
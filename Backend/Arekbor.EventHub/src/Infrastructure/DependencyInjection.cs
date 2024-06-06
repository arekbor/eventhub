using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Infrastructure.Options;
using Arekbor.EventHub.Infrastructure.Persistence;
using Arekbor.EventHub.Infrastructure.Persistence.Repositories;
using Arekbor.EventHub.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Arekbor.EventHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddOptionsConfiguration();
        services.AddDbContext<MongoDbContext>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<IIdentityService, IdentityService>();

        return services;
    }
}
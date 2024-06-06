using Microsoft.Extensions.DependencyInjection;

namespace Arekbor.EventHub.Infrastructure.Options;

public static class OptionsExtensions 
{
    public static IServiceCollection AddOptionsConfiguration(this IServiceCollection services)
    {
        services
            .AddOptions<CorsOptions>()
            .BindConfiguration(CorsOptions.Position)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services
            .AddOptions<MongoDbOptions>()
            .BindConfiguration(MongoDbOptions.Position)
            .ValidateDataAnnotations()
            .ValidateOnStart();
            
        return services;
    }
}
using System.Text;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Infrastructure.Options;
using Arekbor.EventHub.Infrastructure.Persistence;
using Arekbor.EventHub.Infrastructure.Persistence.Caches;
using Arekbor.EventHub.Infrastructure.Persistence.Repositories;
using Arekbor.EventHub.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Arekbor.EventHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddOptionsConfiguration();

        services.AddMongoDb();
        services.AddRedis();

        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICalendarEventRepository, CalendarEventRepository>();

        services.AddScoped(typeof(ICacheManager<>), typeof(CacheManager<>));

        services.AddScoped<IIdentityService, IdentityService>();

        services.AddAuthentication();

        return services;
    }

    private static IServiceCollection AddAuthentication(this IServiceCollection services)
    {
        var identityTokensOptions = services
            .BuildServiceProvider()
            .GetRequiredService<IOptions<IdentityTokensOptions>>().Value;

        var accessTokenSecretKeyBytes = Encoding.ASCII
            .GetBytes(identityTokensOptions.AccessTokenSecretKey);

        services.AddAuthentication(opt => {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(config => {
            config.SaveToken = true;
            config.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = identityTokensOptions.AccessTokenIssuer,
                ValidAudience = identityTokensOptions.AccessTokenAudience,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(accessTokenSecretKeyBytes),
                ClockSkew = TimeSpan.Zero,
            };
        });

        return services;
    }

    private static IServiceCollection AddMongoDb(this IServiceCollection services)
    {
        services.AddSingleton<MongoDbContext>();
        return services;
    }

    private static IServiceCollection AddRedis(this IServiceCollection services)
    {
        var redisOptions = services
            .BuildServiceProvider()
            .GetRequiredService<IOptions<RedisOptions>>().Value;

        return services.AddStackExchangeRedisCache(opt => {
            opt.Configuration = redisOptions.Configuration;
        });
    }

    private static IServiceCollection AddOptionsConfiguration(this IServiceCollection services)
    {
        services
            .AddOptions<CorsOptions>()
            .BindConfiguration("Cors")
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services
            .AddOptions<MongoDbOptions>()
            .BindConfiguration("MongoDb")
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services
            .AddOptions<RedisOptions>()
            .BindConfiguration("Redis")
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services
            .AddOptions<IdentityTokensOptions>()
            .BindConfiguration("IdentityTokens")
            .ValidateDataAnnotations()
            .ValidateOnStart(); 
            
        return services;
    }
}
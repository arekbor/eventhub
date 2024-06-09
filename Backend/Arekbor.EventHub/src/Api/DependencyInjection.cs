using Microsoft.OpenApi.Models;
using Hellang.Middleware.ProblemDetails;
using Arekbor.EventHub.Application.Common.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Arekbor.EventHub.Application.Common.Interfaces;
using Arekbor.EventHub.Api.Services;

namespace Arekbor.EventHub.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IHostEnvironment environment)
    {
        services.AddControllers();

        services.AddProblemDetails(environment);

        services.AddSwagger();

        services.AddScoped<ICurrentUserService, CurrentUserService>();

        return services;
    }

    private static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(config => {
            config.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Event Hub API",
                Version = "1.0",
            });

            config.MapType<DateOnly>(() => new OpenApiSchema{
                Type = "string",
                Format = "date"
            });

            config.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme{
                In = ParameterLocation.Header, 
                Description = "Please insert JWT with Bearer into field",
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey 
            });

            var securityScheme = new OpenApiSecurityScheme()
            {
                Reference = new OpenApiReference()
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };

            var securityRequirements = new OpenApiSecurityRequirement()
            {
                {securityScheme, []},
            };

            config.AddSecurityRequirement(securityRequirements);
        });

        return services;
    }

    private static IServiceCollection AddProblemDetails(this IServiceCollection services, IHostEnvironment environment)
    {
        services.AddProblemDetails(setup => {
            setup.IncludeExceptionDetails = (ctx, ex) => environment.IsDevelopment();

            setup.Map<ModelsValidationException>(ex => new ProblemDetails{
                Detail = ex.Message,
                Status = StatusCodes.Status400BadRequest,
                Extensions = ex.Errors!
            });

            setup.Map<BadRequestException>(ex => new ProblemDetails{
                Detail = ex.Message,
                Status = StatusCodes.Status400BadRequest,
            });

            setup.Map<UnauthorizedException>(ex => new ProblemDetails{
                Detail = ex.Message,
                Status = StatusCodes.Status401Unauthorized
            });

            setup.Map<NotFoundException>(ex => new ProblemDetails{
                Detail = ex.Message,
                Status = StatusCodes.Status404NotFound
            });
        });

        return services;
    }
}
using Microsoft.OpenApi.Models;
using Hellang.Middleware.ProblemDetails;
using Arekbor.EventHub.Application.Common.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace Arekbor.EventHub.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IHostEnvironment environment)
    {
        services.AddControllers();

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
        });

        services.AddSwaggerGen(config => {
            config.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Event Hub API",
                Version = "1.0",
            });
        });

        return services;
    }
}
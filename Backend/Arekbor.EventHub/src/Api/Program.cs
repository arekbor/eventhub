using Arekbor.EventHub.Api;
using Arekbor.EventHub.Infrastructure;
using Arekbor.EventHub.Application;
using Hellang.Middleware.ProblemDetails;
using Microsoft.Extensions.Options;
using Arekbor.EventHub.Infrastructure.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationServices();
builder.Services.AddApiServices(builder.Environment);

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseProblemDetails();

app.UseCors(builder => {
    var corsOptions = app.Services
        .GetRequiredService<IOptions<CorsOptions>>().Value;

    if (corsOptions.AllowCredentials)
        builder.AllowCredentials();
    else
        builder.DisallowCredentials();

    builder.WithOrigins(corsOptions.AllowedOrigins)
        .WithMethods(corsOptions.AllowedMethods)
        .WithHeaders(corsOptions.AllowedHeaders)
        .SetPreflightMaxAge(TimeSpan.FromSeconds(corsOptions.MaxAgeInSeconds));
});

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
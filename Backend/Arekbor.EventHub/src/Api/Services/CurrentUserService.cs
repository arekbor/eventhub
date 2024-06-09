using System.Security.Claims;
using Ardalis.GuardClauses;
using Arekbor.EventHub.Application.Common.Interfaces;

namespace Arekbor.EventHub.Api.Services;

public class CurrentUserService(
    IHttpContextAccessor httpContextAccessor
) : ICurrentUserService
{
    public Guid GetId()
    {
        var httpContext = httpContextAccessor.HttpContext;
        Guard.Against.Null(httpContext);

        var claim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        Guard.Against.Null(claim);

        var id = claim.Value;
        Guard.Against.Null(id);

        if (!Guid.TryParse(id, out Guid guidId))
            throw new Exception($"Error while parsing {id} to GUID");

        return guidId;
    }
}
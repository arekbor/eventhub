using Arekbor.EventHub.Application.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Arekbor.EventHub.Api.Controllers;

public class UsersController : BaseApiController
{
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterUser registerUser, CancellationToken cancellationToken)
        => await Send(registerUser, cancellationToken);

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginUser loginUser, CancellationToken cancellationToken)
        => await Send(loginUser, cancellationToken);

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh(RefreshToken refreshToken, CancellationToken cancellationToken)
        => await Send(refreshToken, cancellationToken);

    [HttpGet("user")]
    public async Task<IActionResult> GetUser(CancellationToken cancellationToken)
        => await Send(new GetUser(), cancellationToken);

    [HttpPut("updateProfile")]
    public async Task<IActionResult> UpdateProfile(UpdateProfile updateProfile, CancellationToken cancellationToken)
        => await Send(updateProfile, cancellationToken);
}
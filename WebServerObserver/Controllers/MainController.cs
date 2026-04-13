using System.Collections.Concurrent;
using WebServerObserver.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebServerObserver.Controllers;

[ApiController]
[Route("api/")]
public class MainController : ControllerBase
{
    private readonly ServerApiService _serverApiService;
    
    public MainController( ServerApiService serverApiService )
    {
        _serverApiService = serverApiService;
    }

    [HttpGet("servers")]
    public IActionResult GetServers()
    {
        var result = _serverApiService.GetServers();
        if(result.Count == 0)
        {
            return StatusCode(503, new ProblemDetails
            {
                Status = StatusCodes.Status503ServiceUnavailable,
                Title = "Service Unavailable",
                Detail = "No data available yet. Please try again later."
            });
        }
        
        return Ok(result);
    }
    
    
}
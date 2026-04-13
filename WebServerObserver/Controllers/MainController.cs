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
    public async Task<IActionResult> GetServers()
    {
        var result = await _serverApiService.GetServers();
        
        if(result.IsFailed)
        {
            return StatusCode(500, result.Errors.First().Message);
        }
        
        return Ok(result.Value);
    }
    
    
}
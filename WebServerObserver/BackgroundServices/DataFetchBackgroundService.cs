using WebServerObserver.Services;

namespace WebServerObserver.BackgroundServices;

public class DataFetchWorker : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<DataFetchWorker> _logger;

    public DataFetchWorker(IServiceProvider serviceProvider, ILogger<DataFetchWorker> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var apiService = scope.ServiceProvider.GetRequiredService<ServerApiService>();
                
                var result = await apiService.UpdateServers();
                if(result.IsSuccess)
                {
                    _logger.LogInformation($"[{DateTime.Now.ToString()}] Updated Hub service data: {result.Value.Count}");
                }
                else
                {
                    _logger.LogCritical($"[{DateTime.Now.ToString()}] Failed to update Hub service data: {result.Errors.FirstOrDefault()?.Message}");
                }
               
            }

            await Task.Delay(TimeSpan.FromMinutes(2), stoppingToken);
        }
    }
}
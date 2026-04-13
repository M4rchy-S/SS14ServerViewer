using FluentResults;

namespace WebServerObserver.Services;

public class ServerApiService
{
        private readonly HttpClient _httpClient;
    
        public ServerApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Result<string>> getServers()
        {
            var response = await _httpClient.GetAsync("/hub/api/servers");
            if (!response.IsSuccessStatusCode)
            {
                Result.Fail($"Error during request: {response.ReasonPhrase}");
            }
            
            return Result.Ok(await response.Content.ReadAsStringAsync());
        }
}
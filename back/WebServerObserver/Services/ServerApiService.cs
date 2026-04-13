using System.Collections.Immutable;
using FluentResults;
using Newtonsoft.Json;

namespace WebServerObserver.Services;

public class ServerApiService
{
        private readonly HttpClient _httpClient;
        private static ImmutableList<ServerStatusModel.ServerInformation> _cachedServers = ImmutableList<ServerStatusModel.ServerInformation>.Empty;
    
        public ServerApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        
        public List<ServerStatusModel.ServerInformation> GetServers()
        {
            return _cachedServers.ToList();
        }

        public async Task<Result<List<ServerStatusModel.ServerInformation>>> UpdateServers()
        {
            var response = await _httpClient.GetAsync("/hub/api/servers");
            if (!response.IsSuccessStatusCode)
            {
                return Result.Fail($"Error during request: {response.ReasonPhrase}");
            }
            
            var stringResult = await response.Content.ReadAsStringAsync();
            
            List<ServerStatusModel.ServerInformation> serverInformations = JsonConvert.DeserializeObject<List<ServerStatusModel.ServerInformation>>(stringResult);
            if (serverInformations == null)
            {
                return Result.Fail($"Error during json conversion: {stringResult}"); 
            }
            
            _cachedServers = serverInformations.ToImmutableList();
            
            return Result.Ok(serverInformations);
        }
}
using FluentResults;
using Newtonsoft.Json;

namespace WebServerObserver.Services;

public class ServerApiService
{
        private readonly HttpClient _httpClient;
    
        public ServerApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Result<List<ServerStatusModel.ServerInformation>>> GetServers()
        {
            var response = await _httpClient.GetAsync("/hub/api/servers");
            if (!response.IsSuccessStatusCode)
            {
                return Result.Fail($"Error during request: {response.ReasonPhrase}");
            }
            
            var stringResult = await response.Content.ReadAsStringAsync();
            
            List<ServerStatusModel.ServerInformation> myDeserializedClass = JsonConvert.DeserializeObject<List<ServerStatusModel.ServerInformation>>(stringResult);
            if (myDeserializedClass == null)
            {
                return Result.Fail($"Error during json conversion: {stringResult}"); 
            }
            
            return Result.Ok(myDeserializedClass);
        }
}
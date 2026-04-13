using WebServerObserver.Middlewars;
using WebServerObserver.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails(); 

builder.Services.AddControllers();

builder.Services.AddHttpClient<ServerApiService>(client =>
{
    client.BaseAddress = new Uri("https://central.spacestation14.io");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

// builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
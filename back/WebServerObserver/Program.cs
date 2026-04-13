using WebServerObserver.BackgroundServices;
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

builder.Services.AddHostedService<DataFetchWorker>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") 
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReactApp");

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
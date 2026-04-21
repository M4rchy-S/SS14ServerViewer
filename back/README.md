# WebServerObserver Backend

A modern API for monitoring and tracking the status of Space Station 14 game servers. The application is written in **C# with ASP.NET Core 9.0** and provides a RESTful API for retrieving server information.

## 🎯 Key Features

- **Automatic Data Updates**: Background service periodically updates server information
- **Data Caching**: Uses immutable collections (ImmutableList) for optimal performance
- **RESTful API**: Clean and intuitive API for retrieving server status
- **Error Handling**: Global exception handling with beautiful ProblemDetails responses
- **CORS Support**: Configured to work with frontend applications
- **OpenAPI Documentation**: Built-in OpenAPI/Swagger support
- **Docker Containerization**: Ready for deployment in containers

## 📋 Requirements

- .NET 9.0 SDK
- Docker (optional)

## 🚀 Quick Start

### Local Deployment

1. **Navigate to project directory**:
```bash
cd C:\Users\Hiro\RiderProjects\WebServerObserver\back
```

2. **Restore dependencies**:
```bash
dotnet restore
```

3. **Run the application**:
```bash
dotnet run --project WebServerObserver
```

The application will be available at: `https://localhost:7xxx`

### Docker Deployment

#### Prerequisites:
- Installed Docker Desktop
- Docker Compose

#### Deployment Steps:

1. **Navigate to the root project directory**:
```bash
cd C:\Users\Hiro\RiderProjects\WebServerObserver
```

2. **Build and run containers**:
```bash
docker-compose up --build
```

The application will be running and ready to receive requests.

3. **Stop containers**:
```bash
docker-compose down
```

## 📊 API Endpoints

### Get Servers
Retrieve a list of all monitored servers with their status.

**Request**:
```
GET /api/servers
```

**Response on Success (200)**:
```json
[
  {
    "address": "server.example.com",
    "statusData": {
      "map": "Box Station",
      "name": "Main Server",
      "tags": ["Round", "Stable"],
      "preset": "Extended",
      "players": 45,
      "round_id": 12345,
      "run_level": 2,
      "short_name": "MAIN",
      "panic_bunker": false,
      "round_start_time": "2026-04-14T10:30:00Z",
      "soft_max_players": 200
    }
  }
]
```

**Response when no data available (503)**:
```json
{
  "status": 503,
  "title": "Service Unavailable",
  "detail": "No data available yet. Please try again later."
}
```

## 🏗️ Architecture

```
WebServerObserver/
├── Controllers/
│   └── MainController.cs         # API endpoints
├── Services/
│   └── ServerApiService.cs       # Business logic, API interactions
├── Models/
│   └── ServerStatusModel.cs      # Data models
├── BackgroundServices/
│   └── DataFetchBackgroundService.cs  # Background data fetching
├── Middlewars/
│   └── ExceptionMiddleware.cs    # Global error handling
└── Program.cs                    # Application configuration
```

## 🔧 Configuration

The application uses the following key components:

- **HttpClient**: Base address `https://central.spacestation14.io`
- **CORS Policy**: Requests allowed from `http://localhost:5173` (frontend)
- **Background Service**: Automatic server data updates
- **Exception Handler**: Global exception handling

## 📦 Dependencies

- Microsoft.AspNetCore.OpenApi
- FluentResults
- Newtonsoft.Json
- Other standard ASP.NET Core packages

## 🐛 Troubleshooting

### CORS Error
Make sure the frontend application is running on `http://localhost:5173`

### Service Unavailable (503)
This may mean the background service hasn't received data yet. Wait a moment or check the logs.

### Docker Issues
- Make sure Docker Desktop is running
- Check that ports are not in use
- View logs: `docker-compose logs -f`

## 📝 License

[Add license information here]

## 👨‍💻 Development

For development, use:
- JetBrains Rider (recommended)
- Visual Studio Code or Visual Studio
- .NET 9.0 SDK

---

**Note**: Replace `xxx` in the URL with the actual port your application is running on.



# WebServerObserver

A comprehensive application for monitoring and tracking the status of Space Station 14 game servers. This project consists of a modern React 19 frontend and a robust ASP.NET Core 9.0 backend API.


## 📖 Project Overview

**WebServerObserver** is a full-stack application designed to monitor game servers for Space Station 14. It consists of:

- **Backend**: C# ASP.NET Core 9.0 API that fetches and serves server data
- **Frontend**: React 19 with TypeScript web interface for viewing server status

The application automatically updates server information in the background and displays it in a beautiful, interactive table.


---

## 🎯 Key Features

### Backend
- ✅ **Automatic Data Updates**: Background service continuously fetches server information
- ✅ **Data Caching**: Immutable collections for optimal performance
- ✅ **RESTful API**: Clean, intuitive endpoints
- ✅ **Global Error Handling**: Centralized exception management with ProblemDetails
- ✅ **CORS Support**: Configured for frontend integration
- ✅ **OpenAPI Documentation**: Built-in Swagger support
- ✅ **Docker Ready**: Pre-configured for containerization

### Frontend
- ✅ **Interactive Server Table**: Real-time server status display
- ✅ **React 19**: Latest React features and improvements
- ✅ **TypeScript**: Full type safety and code reliability
- ✅ **Vite**: Lightning-fast development and build experience
- ✅ **Tailwind CSS**: Modern, responsive styling
- ✅ **shadcn/ui**: Beautiful, accessible UI components
- ✅ **React Query**: Efficient server state management
- ✅ **React Table**: Powerful table functionality

---

## 📦 Requirements

### Backend
- .NET 9.0 SDK
- Docker (optional)

### Frontend
- Node.js 18+
- npm or yarn
- Docker (optional)

### Both
- Docker Desktop (for containerized deployment)
- Docker Compose (for running full stack)

---

## 🚀 Quick Start

### Option 1: Local Development (Both Services)

#### Backend Setup
1. **Navigate to backend directory**:
```bash
cd C:\Users\Hiro\RiderProjects\WebServerObserver\back
```

2. **Restore dependencies**:
```bash
dotnet restore
```

3. **Run the backend**:
```bash
dotnet run --project WebServerObserver
```

Backend available at: `https://localhost:7xxx`

#### Frontend Setup
1. **Navigate to frontend directory**:
```bash
cd C:\Users\Hiro\RiderProjects\WebServerObserver\front
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start dev server**:
```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

#### Access the Application
Open your browser and visit: `http://localhost:5173`

---


## 📁 Project Structure

### Backend Structure

```
WebServerObserver/
├── Controllers/         # API endpoints
├── Services/            # Business logic and API interactions
├── Models/              # Data models and structures
├── BackgroundServices/  # Background tasks and workers
├── Middlewars/          # Custom middleware
├── Properties/          # Launch settings
├── bin/                 # Compiled binaries
├── obj/                 # Build artifacts
├── Program.cs           # Application entry point
└── WebServerObserver.csproj
```

### Frontend Structure

```
src/
├── components/          # React components
│   ├── ServersTable.tsx # Main table component
│   └── ui/              # Reusable UI components
├── types/               # TypeScript interfaces
├── lib/                 # Utility functions
├── assets/              # Static files and images
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---





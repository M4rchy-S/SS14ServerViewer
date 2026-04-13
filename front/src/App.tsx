import { useState, useEffect } from 'react'
import './App.css'
import type {ServerInformation} from "./types/ServerStatus.ts";
import { ServersTable } from "./components/ServersTable.tsx";

function App() {
  const [servers, setServers] = useState([] as ServerInformation[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://localhost:3000/api/servers")
      .then(res => res.json())
      .then(data => {
        data = data as ServerInformation[];
        console.log(data);
        setServers(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("CORS или сетевая ошибка:", err)
        setError("Не удалось загрузить данные")
        setLoading(false)
      })
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 relative overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
                Space Station 14
              </h1>
              <p className="text-xl text-slate-400 font-medium">
                Мониторинг серверов
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="px-6 py-3 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-600/30 rounded-full shadow-lg">
              <p className="text-slate-300 text-sm">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Онлайн мониторинг в реальном времени
              </p>
            </div>
          </div>
        </header>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-4 px-8 py-6 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl shadow-2xl">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <p className="text-slate-300 text-lg font-medium">Загрузка данных...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-gradient-to-r from-red-950/50 to-red-900/50 backdrop-blur-sm border border-red-500/30 text-red-200 p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-lg font-semibold">Ошибка загрузки</h3>
              </div>
              <p className="text-red-300/80">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="animate-fade-in">
            <ServersTable servers={servers} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App

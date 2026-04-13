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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🚀 Space Station 14 Servers
          </h1>
          <p className="text-slate-300">
            Мониторинг статуса всех серверов
          </p>
        </header>

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-300">Загрузка данных...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <ServersTable servers={servers} />
        )}
      </div>
    </div>

  )
}

export default App




import type { ServerInformation } from '../types/ServerStatus'

interface ServersTableProps {
  servers: ServerInformation[]
}

export function ServersTable({ servers }: ServersTableProps) {
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return '-'
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-2xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              🌐 Адрес
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              📛 Название
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              🗺️ Карта
            </th>
            <th className="px-6 py-4 text-center font-semibold text-slate-100">
              👥 Игроки
            </th>
            <th className="px-6 py-4 text-center font-semibold text-slate-100">
              📊 Макс
            </th>
            <th className="px-6 py-4 text-center font-semibold text-slate-100">
              🔄 Раунд
            </th>
            <th className="px-6 py-4 text-center font-semibold text-slate-100">
              ⚙️ Уровень
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              📝 Короткое имя
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              ⚡ Профиль
            </th>
            <th className="px-6 py-4 text-center font-semibold text-slate-100">
              🚨 Паника
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              🏷️ Теги
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              🏷️ Выведенные теги
            </th>
            <th className="px-6 py-4 text-left font-semibold text-slate-100">
              ⏰ Начало раунда
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {servers.length === 0 ? (
            <tr>
              <td colSpan={13} className="px-6 py-8 text-center text-slate-400">
                Серверы не найдены
              </td>
            </tr>
          ) : (
            servers.map((server, index) => {
              // Безопасное получение данных с fallback значениями
              const address = server?.address ?? '-'
              const statusData = server?.StatusData
              const name = statusData?.name ?? '-'
              const map = statusData?.map ?? '-'
              const players = statusData?.players ?? 0
              const softMaxPlayers = statusData?.soft_max_players ?? 0
              const roundId = statusData?.round_id ?? 0
              const runLevel = statusData?.run_level ?? 0
              const shortName = statusData?.short_name ?? '-'
              const preset = statusData?.preset ?? '-'
              const panicBunker = statusData?.panic_bunker ?? false
              const tags = statusData?.tags ?? []
              const inferredTags = server?.inferredTags ?? []
              const roundStartTime = statusData?.round_start_time

              return (
                <tr
                  key={index}
                  className={`transition-colors hover:bg-slate-700/30 ${
                    panicBunker 
                      ? 'bg-red-950/20 hover:bg-red-950/30' 
                      : 'bg-slate-800/40 hover:bg-slate-700/40'
                  }`}
                >
                  <td className="px-6 py-4 font-mono text-slate-300 text-xs">
                    {address}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-400 max-w-xs truncate">
                    {name}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {map}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${
                      players >= softMaxPlayers * 0.8 
                        ? 'bg-red-600/80' 
                        : players >= softMaxPlayers * 0.5 
                        ? 'bg-yellow-600/80' 
                        : 'bg-green-600/80'
                    }`}>
                      {players}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-300">
                    {softMaxPlayers}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-300 font-mono">
                    #{roundId}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs">
                      {runLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-xs">
                    {shortName}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {preset}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full font-semibold text-white ${
                      panicBunker 
                        ? 'bg-red-600/90 animate-pulse' 
                        : 'bg-green-600/60'
                    }`}>
                      {panicBunker ? '🔴 ДА' : '🟢 НЕТ'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {tags.length > 0 ? (
                        tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-1 bg-purple-600/60 text-purple-100 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {inferredTags.length > 0 ? (
                        inferredTags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-1 bg-cyan-600/60 text-cyan-100 rounded text-xs font-medium"
                          >
                            {String(tag)}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-xs">
                    {formatDate(roundStartTime)}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      <div className="bg-slate-800/50 border-t border-slate-700 px-6 py-3 text-sm text-slate-400">
        <p>
          Всего серверов: <span className="font-semibold text-slate-300">{servers.length}</span> |
          Активных: <span className="font-semibold text-green-400">{servers.filter(s => !s.StatusData?.panic_bunker).length}</span> |
          На паузе: <span className="font-semibold text-red-400">{servers.filter(s => s.StatusData?.panic_bunker).length}</span>
        </p>
      </div>
    </div>
  )
}


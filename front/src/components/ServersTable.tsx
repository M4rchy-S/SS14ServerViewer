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
    <div className="w-full overflow-x-auto rounded-xl border border-slate-600/50 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full min-w-[1200px] text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 border-b border-slate-500/50 shadow-lg">
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs">
              🌐 Адрес
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs">
              📛 Название
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs">
              🗺️ Карта
            </th>
            <th className="px-3 py-3 text-center font-bold text-slate-100 tracking-wide text-xs">
              👥 Игроки
            </th>
            <th className="px-3 py-3 text-center font-bold text-slate-100 tracking-wide text-xs">
              📊 Макс
            </th>
            <th className="px-3 py-3 text-center font-bold text-slate-100 tracking-wide text-xs">
              🔄 Раунд
            </th>
            <th className="px-3 py-3 text-center font-bold text-slate-100 tracking-wide text-xs">
              ⚙️ Уровень
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs hidden md:table-cell">
              📝 Короткое имя
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs hidden lg:table-cell">
              ⚡ Профиль
            </th>
            <th className="px-3 py-3 text-center font-bold text-slate-100 tracking-wide text-xs">
              🚨 Паника
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs hidden xl:table-cell">
              🏷️ Теги
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs hidden xl:table-cell">
              🏷️ Выведенные теги
            </th>
            <th className="px-3 py-3 text-left font-bold text-slate-100 tracking-wide text-xs hidden lg:table-cell">
              ⏰ Начало раунда
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600/30">
          {servers.length === 0 ? (
            <tr>
              <td colSpan={13} className="px-6 py-12 text-center text-slate-400">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  <span className="text-lg">Серверы не найдены</span>
                </div>
              </td>
            </tr>
          ) : (
            servers.map((server, index) => {
              // Безопасное получение данных с fallback значениями
              const address = server?.address ?? '-'
              const statusData = server?.statusData
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
                  className={`transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${
                    panicBunker 
                      ? 'bg-gradient-to-r from-red-950/30 to-red-900/20 hover:from-red-950/40 hover:to-red-900/30' 
                      : 'bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/40 hover:to-slate-700/30'
                  }`}
                >
                  <td className="px-3 py-3 font-mono text-slate-300 text-xs bg-slate-900/20">
                    <span className="inline-block px-2 py-1 bg-slate-800/60 rounded text-slate-200 border border-slate-600/30 text-xs">
                      {address}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-blue-400 max-w-xs truncate">
                    <span className="inline-block px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-xs">
                      {name}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-300">
                    <span className="inline-block px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs">
                      {map}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white font-bold shadow-lg transition-all duration-300 text-xs ${
                      players >= softMaxPlayers * 0.8 
                        ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/30 animate-pulse' 
                        : players >= softMaxPlayers * 0.5 
                        ? 'bg-gradient-to-r from-yellow-600 to-orange-500 shadow-yellow-500/30' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-500 shadow-green-500/30'
                    }`}>
                      <span className="text-sm">👥</span>
                      {players}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-slate-300">
                    <span className="inline-block px-2 py-1 bg-slate-700/60 rounded-lg border border-slate-600/30 text-xs">
                      {softMaxPlayers}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-slate-300 font-mono">
                    <span className="inline-block px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300 text-xs">
                      #{roundId}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-block px-2 py-1.5 bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 rounded-lg border border-slate-500/30 shadow-md text-xs">
                      {runLevel}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-300 text-xs hidden md:table-cell">
                    <span className="inline-block px-2 py-1 bg-slate-800/60 rounded text-slate-200 border border-slate-600/30 text-xs">
                      {shortName}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-300 hidden lg:table-cell">
                    <span className="inline-block px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 text-xs">
                      {preset}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-white shadow-lg transition-all duration-300 text-xs ${
                      panicBunker 
                        ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/50 animate-pulse' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-500 shadow-green-500/30'
                    }`}>
                      {panicBunker ? '🚨 ДА' : '✅ НЕТ'}
                    </span>
                  </td>
                  <td className="px-3 py-3 hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-32">
                      {tags.length > 0 ? (
                        tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 bg-gradient-to-r from-purple-600/80 to-purple-500/80 text-purple-100 rounded-full text-xs font-semibold shadow-md border border-purple-400/30 hover:shadow-purple-500/50 transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-xs">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden xl:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-32">
                      {inferredTags.length > 0 ? (
                        inferredTags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 bg-gradient-to-r from-cyan-600/80 to-cyan-500/80 text-cyan-100 rounded-full text-xs font-semibold shadow-md border border-cyan-400/30 hover:shadow-cyan-500/50 transition-all duration-200"
                          >
                            {String(tag)}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-xs">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-300 text-xs hidden lg:table-cell">
                    <span className="inline-block px-2 py-1 bg-slate-800/60 rounded-lg text-slate-200 border border-slate-600/30 text-xs">
                      {formatDate(roundStartTime)}
                    </span>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-t border-slate-600/50 px-4 py-3 text-sm text-slate-400 backdrop-blur-sm">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-semibold text-xs">Всего серверов:</span>
            <span className="px-2 py-1 bg-slate-700/60 rounded-full text-slate-200 border border-slate-600/30 text-xs">
              {servers.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-semibold text-xs">Активных:</span>
            <span className="px-2 py-1 bg-green-500/20 rounded-full text-green-300 border border-green-500/30 text-xs">
              {servers.filter(s => !s.statusData?.panic_bunker).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-semibold text-xs">На паузе:</span>
            <span className="px-2 py-1 bg-red-500/20 rounded-full text-red-300 border border-red-500/30 text-xs">
              {servers.filter(s => s.statusData?.panic_bunker).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

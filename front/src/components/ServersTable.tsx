'use client'

import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table'

import type { ServerInformation } from '../types/ServerStatus'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ServersTableProps {
  servers: ServerInformation[]
}

const columnHelper = createColumnHelper<ServerInformation>()

export function ServersTable({ servers }: ServersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [searchTerm, setSearchTerm] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.statusData?.name ?? '-', {
        id: 'name',
        header: '📛 Name',
        cell: (info) => (
          <div className="break-words whitespace-normal min-w-10/12" title={info.getValue()}>
            <h4 className="text-sm leading-tight">
              {info.getValue()}
            </h4>
          </div>
        ),
        size: 150,
      }),
      columnHelper.accessor((row) => row.statusData?.map ?? '-', {
        id: 'map',
        header: '🗺️ Map',
        cell: (info) => (
          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
            {info.getValue()}
          </Badge>
        ),
        size: 100,
      }),
      columnHelper.accessor((row) => row.statusData?.players ?? 0, {
        id: 'players',
        header: '👥 Players',
        cell: (info) => {
          const players = info.getValue()
          const maxPlayers = info.row.original.statusData?.soft_max_players ?? 0
          const percentage = maxPlayers > 0 ? (players / maxPlayers) * 100 : 0

          const getColor = () => {
            if (percentage >= 80) return 'bg-red-600 text-white'
            if (percentage >= 50) return 'bg-yellow-600 text-white'
            return 'bg-green-600 text-white'
          }

          return (
            <div className="text-center">
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-bold text-xs ${getColor()}`}>
                {players}/{maxPlayers}
              </div>
            </div>
          )
        },
        size: 80,
      }),
      columnHelper.accessor((row) => row.statusData?.round_id ?? 0, {
        id: 'roundId',
        header: '🔄 Round',
        cell: (info) => (
          <Badge variant="outline" className="font-mono text-purple-300 border-purple-500/30 text-xs">
            #{info.getValue()}
          </Badge>
        ),
        size: 80,
      }),
      columnHelper.accessor((row) => row.statusData?.panic_bunker ?? false, {
        id: 'status',
        header: '📊 Status',
        cell: (info) => {
          const isPanic = info.getValue()
          const players = info.row.original.statusData?.players ?? 0
          const isOnline = players > 0

          return (
            <div className="flex flex-col gap-1">
              <Badge
                variant={isOnline ? 'default' : 'secondary'}
                className={`text-xs ${isOnline ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}
              >
                {isOnline ? '🟢 Online' : '⚫ Offline'}
              </Badge>
              {isPanic && (
                <Badge variant="destructive" className="bg-red-600 text-white text-xs animate-pulse">
                  🚨 Panic
                </Badge>
              )}
            </div>
          )
        },
        size: 100,
      }),
      columnHelper.accessor((row) => row.statusData?.language ?? '-', {
        id: 'language',
        header: '🌐 Language',
        cell: (info) => (
          <Badge variant="outline" className="text-blue-300 border-blue-500/30 text-xs">
            {info.getValue().toUpperCase()}
          </Badge>
        ),
        size: 100,
      }),
      columnHelper.accessor((row) => row.statusData?.region ?? '-', {
        id: 'region',
        header: '🌍 Region',
        cell: (info) => (
          <Badge variant="outline" className="text-cyan-300 border-cyan-500/30 text-xs">
            {info.getValue().toUpperCase()}
          </Badge>
        ),
        size: 100,
      }),
    ],
    []
  )

  const filteredServers = useMemo(() => {
    return servers.filter((server) =>
      server.statusData?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [servers, searchTerm])

  const table = useReactTable({
    data: filteredServers,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (servers.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-2xl">🔍</span>
          <span className="text-lg">No servers found</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="🔍 Search by server name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPagination({ pageIndex: 0, pageSize: 10 })
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-black/50 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ✕ Clear
          </button>
        )}
      </div>

      <div className="rounded-xl border border-purple-500/30 shadow-2xl bg-black/80 backdrop-blur-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-blue-900/90 hover:from-purple-800/90 hover:via-purple-700/90 hover:to-blue-800/90 border-b border-purple-500/30">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-white font-bold text-xs tracking-wide text-left cursor-pointer select-none hover:bg-purple-800/50 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ width: header.column.getSize() }}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? ''}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`transition-all duration-300 hover:bg-purple-900/20 border-b border-purple-500/10 ${
                  row.original.statusData?.panic_bunker
                    ? 'bg-red-950/10'
                    : 'bg-gray-900/10'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 px-3 text-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filteredServers.length
            )} of {filteredServers.length} servers
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-black border-purple-500/50 hover:bg-purple-600/20 hover:border-purple-400"
          >
            ← Previous
          </Button>

          {/*<div className="flex items-center gap-1">*/}
          {/*  {Array.from({ length: table.getPageCount() }, (_, i) => (*/}
          {/*    <Button*/}
          {/*      key={i}*/}
          {/*      variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}*/}
          {/*      size="sm"*/}
          {/*      onClick={() => table.setPageIndex(i)}*/}
          {/*      className={`w-8 h-8 p-0 ${*/}
          {/*        table.getState().pagination.pageIndex === i*/}
          {/*          ? 'bg-purple-600 text-white border-purple-500'*/}
          {/*          : 'text-white border-purple-500/50 hover:bg-blue-600/20 hover:border-blue-400'*/}
          {/*      }`}*/}
          {/*    >*/}
          {/*      {i + 1}*/}
          {/*    </Button>*/}
          {/*  ))}*/}
          {/*</div>*/}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-black border-purple-500/50 hover:bg-purple-600/20 hover:border-purple-400"
          >
            Next →
          </Button>
        </div>
      </div>

      {/* Statistics Footer */}
      <div className="bg-gradient-to-r from-black/80 via-purple-900/60 to-blue-900/60 border border-purple-500/30 px-4 py-3 text-sm text-gray-300 backdrop-blur-sm rounded-xl shadow-2xl">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-xs">Total servers:</span>
            <Badge variant="outline" className="text-white border-purple-400 bg-purple-900/20">
              {servers.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-300 font-semibold text-xs">Filtered:</span>
            <Badge className="bg-blue-600 text-white border-blue-400">
              {filteredServers.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300 font-semibold text-xs">Active:</span>
            <Badge className="bg-green-600 text-white border-green-400">
              {filteredServers.filter(s => !s.statusData?.panic_bunker).length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-300 font-semibold text-xs">On hold:</span>
            <Badge variant="destructive" className="bg-red-600 text-white border-red-400">
              {filteredServers.filter(s => s.statusData?.panic_bunker).length}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

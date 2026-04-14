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

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.statusData?.name ?? '-', {
        id: 'name',
        header: '📛 Name',
        cell: (info) => (
          <div className="max-w-48 truncate" title={info.getValue()}>
            <h4>
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
      columnHelper.accessor((row) => row.statusData?.tags ?? [], {
        id: 'tags',
        header: '🏷️ Tags',
        cell: (info) => {
          const tags = info.getValue()
          return (
            <div className="flex flex-wrap gap-1 max-w-32">
              {tags.length > 0 ? (
                tags.slice(0, 2).map((tag: string, i: number) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-purple-300 border-purple-500/30 text-xs"
                  >
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-white italic text-xs">-</span>
              )}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-white text-xs border-white/30">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          )
        },
        size: 120,
      }),
    ],
    []
  )

  const table = useReactTable({
    data: servers,
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
              servers.length
            )} of {servers.length} servers
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
            <span className="text-blue-300 font-semibold text-xs">Active:</span>
            <Badge className="bg-blue-600 text-white border-blue-400">
              {servers.filter(s => !s.statusData?.panic_bunker).length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-300 font-semibold text-xs">On hold:</span>
            <Badge variant="destructive" className="bg-red-600 text-white border-red-400">
              {servers.filter(s => s.statusData?.panic_bunker).length}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

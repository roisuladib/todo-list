'use client';

import type { Task } from '^/types';

import { useState } from 'react';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getGroupedRowModel,
  type SortingState,
  TableMeta,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useTaskStore } from '^/hooks/use-get-tasks';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tasks: Task[];
  summary: React.ReactNode;
}

export function TaskTable<TData, TValue>({
  columns,
  data,
  summary,
  tasks,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { updateTask } = useTaskStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    meta: {
      updateData: (rowIndex: number, columnId: number, value: unknown) => {
        const task = tasks[rowIndex];
        if (!task) return;

        updateTask(task.id, {
          [columnId]: value,
        });
      },
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
        {summary}
      </TableBody>
    </Table>
  );
}

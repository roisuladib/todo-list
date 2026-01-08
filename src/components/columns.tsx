import type { CellContext, ColumnDef } from '@tanstack/react-table';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { priorityColors, statusColors, typeColors } from './task-color';
import { Chip, type ChipVariants } from './ui/chip';
import { type Task, TaskPriority, TaskStatus, TaskType } from '^/types';

const EditableTextCell = ({ getValue, row, column, table }: CellContext<Task, unknown>) => {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    setIsEditing(false);
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (isEditing) {
    return (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        autoFocus
        className="w-full border-primary border-b-2 bg-primary/10 focus:outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="w-full cursor-text rounded text-start transition-colors hover:bg-content2">
      {value || <span className="text-default-500">Click to edit</span>}
    </button>
  );
};

const EditableNumberCell = ({ getValue, row, column, table }: CellContext<Task, unknown>) => {
  const initialValue = getValue() as number;
  const [value, setValue] = useState(initialValue.toString());
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    setIsEditing(false);
    table.options.meta?.updateData(row.index, column.id, Number(value) || 0);
  };

  useEffect(() => {
    setValue(initialValue.toString());
  }, [initialValue]);

  if (isEditing) {
    return (
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        autoFocus
        className="w-12 max-w-full border-primary border-b-2 bg-primary/10 focus:outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="w-full cursor-text rounded text-start transition-colors hover:bg-content2">
      {initialValue}
    </button>
  );
};

const EditableDevelopersCell = ({ getValue, row, column, table }: CellContext<Task, unknown>) => {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    setIsEditing(false);
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (isEditing) {
    return (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        placeholder="Separate with commas"
        autoFocus
        className="w-full border-primary border-b-2 bg-primary/10 focus:outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="w-full cursor-text rounded transition-colors hover:bg-content2">
      <div className="flex flex-wrap gap-1">
        {initialValue.length > 0 ? (
          initialValue
            .split(',')
            .map(d => d.trim())
            .filter(d => d)
            .map((dev, i) => (
              <div
                key={i.toString()}
                className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-default align-middle text-foreground text-xs outline-solid outline-transparent ring-1 ring-default ring-offset-1 ring-offset-background transition-transform"
                title={dev}>
                {getInitials(dev)}
              </div>
            ))
        ) : (
          <span className="text-default-500">Click to add</span>
        )}
      </div>
    </button>
  );
};

const EditableChipSelectCell = <T extends string>({
  getValue,
  row,
  column,
  table,
  options,
  colors,
}: CellContext<Task, unknown> & {
  options: readonly T[];
  colors: Record<T, ChipVariants['color']>;
}) => {
  const value = getValue() as T;
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (newValue: T) => {
    setIsEditing(false);
    table.options.meta?.updateData(row.index, column.id, newValue);
  };

  if (isEditing) {
    return (
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        onBlur={() => setIsEditing(false)}
        autoFocus
        className="w-full border-primary border-b-2 bg-primary/10 focus:outline-none">
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <button type="button" onClick={() => setIsEditing(true)}>
      <Chip color={colors[value]} size="sm">
        {value}
      </Chip>
    </button>
  );
};

const EditableDateCell = ({ row, column, table }: CellContext<Task, unknown>) => {
  const value = row.original.createdAt;
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoDate = dayjs(e.target.value).format('YYYY-MM-DD');
    table.options.meta?.updateData(row.index, column.id, isoDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="date"
        value={dayjs(value).format('YYYY-MM-DD')}
        onChange={onChange}
        onBlur={() => setIsEditing(false)}
        autoFocus
        className="w-full rounded border px-2 py-1 text-sm"
      />
    );
  }

  return (
    <button type="button" onClick={() => setIsEditing(true)} className="cursor-text">
      {dayjs(value).format('DD MMM, YYYY')}
    </button>
  );
};

const STATUS_OPTIONS = Object.values(TaskStatus);
const PRIORITY_OPTIONS = Object.values(TaskPriority);
const TYPE_OPTIONS = Object.values(TaskType);

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'TITLE',
    cell: EditableTextCell,
  },
  {
    accessorKey: 'developer',
    header: 'DEVELOPER',
    cell: EditableDevelopersCell,
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ctx => <EditableChipSelectCell {...ctx} options={STATUS_OPTIONS} colors={statusColors} />,
  },
  {
    accessorKey: 'priority',
    header: 'PRIORITY',
    cell: ctx => (
      <EditableChipSelectCell {...ctx} options={PRIORITY_OPTIONS} colors={priorityColors} />
    ),
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
    cell: ctx => <EditableChipSelectCell {...ctx} options={TYPE_OPTIONS} colors={typeColors} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'DATE',
    cell: EditableDateCell,
  },
  {
    accessorKey: 'Estimated SP',
    header: 'ESTIMATED SP',
    cell: EditableNumberCell,
  },
  {
    accessorKey: 'Actual SP',
    header: 'ACTUAL SP',
    cell: EditableNumberCell,
  },
];

import { PlusIcon, SearchIcon } from 'lucide-react';
import { cn } from 'tailwind-variants';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface TaskFilterProps {
  onNewTask: () => void;
  search: string | null;
  setSearch: (search?: string) => void;
  developers: string[];
  selectedDevelopers: string[] | null;
  setDevelopers: (developers?: string[] | null) => void;
  className?: string;
}

export default function TaskFilter({
  onNewTask,
  search,
  setSearch,
  developers,
  selectedDevelopers,
  setDevelopers,
  className,
}: TaskFilterProps) {
  return (
    <div className={cn('my-4 flex flex-wrap items-center gap-3', className)}>
      <Button
        color="primary"
        size="sm"
        startContent={<PlusIcon className="size-4" />}
        onPress={onNewTask}>
        New Task
      </Button>
      <Input
        startContent={<SearchIcon className="size-4" />}
        size="sm"
        value={search || ''}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />
      <select
        value=""
        onChange={e => {
          const dev = e.target.value;
          const _selectedDevelopers = selectedDevelopers || [];
          if (dev && !_selectedDevelopers?.includes(dev)) {
            setDevelopers([..._selectedDevelopers, dev]);
          }
        }}
        className="inline-flex h-8 rounded-lg bg-default-100 px-3 outline-none">
        <option value="">Filter by developer</option>
        {developers.map(dev => (
          <option key={dev} value={dev}>
            {dev}
          </option>
        ))}
      </select>
      {selectedDevelopers && selectedDevelopers?.length > 0 && (
        <div className="flex gap-2">
          {selectedDevelopers?.map(dev => (
            <span
              key={dev}
              className="flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-blue-700 text-xs">
              {dev}
              <button
                type="button"
                onClick={() => setDevelopers(selectedDevelopers?.filter(d => d !== dev))}
                className="hover:text-blue-900">
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

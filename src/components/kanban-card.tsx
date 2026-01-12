import type { Task } from '^/types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { priorityColors, typeColors } from './task-color';
import { Chip } from './ui/chip';

export function KanbanCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { status: task.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const developers = task.developer
    .split(',')
    .map(d => d.trim())
    .filter(Boolean);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move rounded-lg bg-default-100 p-3 outline-none transition-all duration-300 hover:scale-105 hover:shadow-small">
      <h4 className="mb-2 line-clamp-2">{task.title}</h4>
      <div className="mb-3 flex flex-col gap-1">
        <Chip color={priorityColors[task.priority]} size="sm">
          {task.priority}
        </Chip>
        <Chip color={typeColors[task.type]} size="sm">
          {task.type}
        </Chip>
      </div>
      <div className="flex items-center justify-between">
        <Chip size="sm">{task['Estimated SP']} SP</Chip>
        <div className="flex h-auto w-max items-center justify-center">
          {developers.slice(0, 3).map((dev, i) => (
            <div
              key={`${i + 1}-${dev}`}
              className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-default align-middle text-foreground text-xs outline-solid outline-transparent ring-1 ring-default ring-offset-1 ring-offset-background transition-transform"
              title={dev}>
              {getInitials(dev)}
            </div>
          ))}
          {developers.length > 3 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-600 text-xs">
              +{developers.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

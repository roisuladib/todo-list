import { useDroppable } from '@dnd-kit/core';
import { CircleCheckIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon } from 'lucide-react';

import { Chip } from './ui/chip';
import { TaskStatus } from '^/types';

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.TODO]: <CircleIcon className="size-6 text-default" />,
  [TaskStatus.IN_PROGRESS]: <CircleDotDashedIcon className="size-6 text-warning" />,
  [TaskStatus.IN_REVIEW]: <CircleDotIcon className="size-6 text-secondary" />,
  [TaskStatus.PENDING_DEPLOY]: <CircleDotIcon className="size-6 text-primary" />,
  [TaskStatus.DONE]: <CircleCheckIcon className="size-6 text-success" />,
  [TaskStatus.STUCK]: <CircleDotIcon className="size-6 text-danger" />,
};

interface DroppableProps {
  id: TaskStatus;
  count: number;
  children: React.ReactNode;
}

export default function Droppable({ id, children, count }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id, data: { status: id } });

  return (
    <div ref={setNodeRef} className="shrink-0 snap-start scroll-ml-4">
      <div className="flex h-full w-64 max-w-full flex-col gap-4 rounded-1.5xl p-4 shadow-small">
        <div className="flex items-center gap-x-2">
          {statusIconMap[id]}
          <div className="font-medium text-base">{id}</div>
          <Chip size="sm" color="primary" className="ml-auto">
            {count}
          </Chip>
        </div>
        {children}
        {count === 0 && (
          <div className="grid h-12 w-full place-items-center rounded-lg border border-default border-dashed text-default-500">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

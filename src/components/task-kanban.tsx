import { useState } from 'react';

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CircleCheckIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon } from 'lucide-react';

import { KanbanCard } from './kanban-card';
import { Chip } from './ui/chip';
import { type Task, TaskStatus } from '^/types';

const boards: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.PENDING_DEPLOY,
  TaskStatus.DONE,
  TaskStatus.STUCK,
];

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.TODO]: <CircleIcon className="size-6 text-default" />,
  [TaskStatus.IN_PROGRESS]: <CircleDotDashedIcon className="size-6 text-warning" />,
  [TaskStatus.IN_REVIEW]: <CircleDotIcon className="size-6 text-secondary" />,
  [TaskStatus.PENDING_DEPLOY]: <CircleDotIcon className="size-6 text-primary" />,
  [TaskStatus.DONE]: <CircleCheckIcon className="size-6 text-success" />,
  [TaskStatus.STUCK]: <CircleDotIcon className="size-6 text-danger" />,
};

type TasksState = {
  [key in TaskStatus]: Task[];
};

interface TaskKanbanProps {
  data: Task[];
  onChange: (tasks: { $id: string; status: TaskStatus; position: number }[]) => void;
}

export default function TaskKanban({ data, onChange }: TaskKanbanProps) {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.PENDING_DEPLOY]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.STUCK]: [],
    };

    data.forEach(task => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach(status => {
      initialTasks[status as TaskStatus].sort((a, b) => a['Estimated SP'] - b['Estimated SP']);
    });

    return initialTasks;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    setParent(over ? over.id : null);
  }

  function handleDragStart(event: DragEndEvent) {
    const { active } = event;

    setParent(active ? active.id : null);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}>
      <div className="scrollbar-hide flex w-full snap-x gap-4 overflow-x-auto p-4">
        {boards.map(board => (
          <Droppable key={board} id={board} title={board} count={tasks[board].length}>
            <SortableContext
              items={tasks[board].map(t => t)}
              strategy={verticalListSortingStrategy}>
              {tasks[board].map((task, index) => (
                <KanbanCard key={index.toString()} task={task} />
              ))}
            </SortableContext>
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
}

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  title: TaskStatus;
  count: number;
}

function Droppable({ id, children, title, count }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="shrink-0 snap-start scroll-ml-4">
      <div className="flex h-full w-64 max-w-full flex-col gap-4 rounded-1.5xl p-4 shadow-small">
        <div className="flex items-center gap-x-2">
          {statusIconMap[title]}
          <div className="font-medium text-base">{title}</div>
          <Chip size="sm" color="primary" className="ml-auto">
            {count}
          </Chip>
        </div>
        {children}
      </div>
    </div>
  );
}

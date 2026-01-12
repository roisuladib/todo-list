import type { Task, TaskStatus } from '^/types';
import type { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';

import { useState } from 'react';

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Droppable from './droppable';
import { KanbanCard } from './kanban-card';
import { statuses } from './task-view-switcher';
import { useTaskStore } from '^/hooks/use-get-tasks';

interface TaskKanbanProps {
  data: Task[];
}

export default function TaskKanban({ data }: TaskKanbanProps) {
  const { setTasks } = useTaskStore();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [taskId, setTaskId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setTaskId(event.active.id);
  };

  function handleDragOver(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const activeIndex = data.findIndex(t => t.id === activeId);
    if (activeIndex === -1) return;

    const activeTask = data[activeIndex];

    const overData = over.data.current;
    if (!overData) return;

    const overStatus = overData.status as TaskStatus;

    const updated = [...data];
    updated[activeIndex] = {
      ...activeTask,
      status: overStatus,
    };

    const overIndex = data.findIndex(t => t.id === Number(over.id));
    if (overIndex !== -1) {
      setTasks(arrayMove(updated, activeIndex, overIndex));
    } else {
      setTasks(updated);
    }
  }


  const activeTask = taskId ? data.find(t => t.id === taskId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}>
      <div className="scrollbar-hide flex w-full snap-x gap-4 overflow-x-auto p-4">
        {statuses.map((status: TaskStatus) => {
          const tasksInStatus = data.filter(t => t.status === status);

          return (
            <Droppable key={status} id={status} count={tasksInStatus.length}>
              <SortableContext
                items={tasksInStatus.map(t => t.id)}
                strategy={verticalListSortingStrategy}>
                {tasksInStatus.map(task => (
                  <KanbanCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </Droppable>
          );
        })}
      </div>
      <DragOverlay>{activeTask ? <KanbanCard task={activeTask} /> : null}</DragOverlay>
    </DndContext>
  );
}

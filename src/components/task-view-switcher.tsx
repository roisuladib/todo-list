'use client';

import { useEffect } from 'react';

import { useQueryState } from 'nuqs';
import { cn } from 'tailwind-variants';

import { columns } from './columns';
import { priorityColors, statusColors, typeColors } from './task-color';
import TaskFilter from './task-filter';
import TaskKanban from './task-kanban';
import { TaskTable } from './task-table';
import { Chip } from './ui/chip';
import { TableCell, TableRow } from './ui/table';
import { Tab, Tabs } from './ui/tabs';
import { useTaskStore } from '^/hooks/use-get-tasks';
import { useTaskFilters } from '^/hooks/use-task-filters';
import { type Task, TaskPriority, TaskStatus, TaskType } from '^/types';

export const statuses = Object.keys(statusColors) as TaskStatus[];
export const priorities = Object.keys(priorityColors) as TaskPriority[];
export const types = Object.keys(typeColors) as TaskType[];

export default function TaskViewSwitcher({ initialTasks }: { initialTasks: Task[] }) {
  const { tasks, hasHydrated, setTasks, addTask } = useTaskStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!hasHydrated) return;

    if (tasks.length === 0 && initialTasks.length > 0) {
      setTasks(initialTasks);
    }
  }, [hasHydrated]);

  const [view, setView] = useQueryState('task-view', { defaultValue: 'table' });
  const [{ status, developers: selectedDevelopers, search }, setTaskFilters] = useTaskFilters();

  const filteredTasks = tasks.filter(task => {
    const matchStatus = status ? task.status === status : true;

    const taskDevelopers = task.developer
      .split(',')
      .map(d => d.trim().toLowerCase())
      .filter(Boolean);
    const matchDeveloper = selectedDevelopers?.length
      ? selectedDevelopers.every(dev => taskDevelopers.includes(dev.toLowerCase()))
      : true;

    const matchSearch = search ? task.title.toLowerCase().includes(search.toLowerCase()) : true;

    return matchStatus && matchDeveloper && matchSearch;
  });

  const addNewTask = () => {
    const newTask: Omit<Task, 'id' | 'createdAt'> = {
      title: '',
      developer: '',
      status: TaskStatus.TODO,
      priority: TaskPriority.BEST_EFFORT,
      type: TaskType.FEATURE,
      'Estimated SP': 0,
      'Actual SP': 0,
    };
    addTask(newTask);
  };

  const getPercentage = <K extends keyof Task>(field: K, value: Task[K]) => {
    const total = filteredTasks.length;
    if (total === 0) return 0;
    const count = filteredTasks.filter(t => t[field] === value).length;
    return Math.round((count / total) * 100);
  };

  const developers = () => {
    const devs = new Set<string>();
    tasks.forEach(task => {
      task.developer
        .split(',')
        .map(d => d.trim())
        .filter(d => d)
        .forEach(dev => {
          devs.add(dev);
        });
    });
    return Array.from(devs);
  };

  const renderTaskFilter = (
    <TaskFilter
      onNewTask={addNewTask}
      search={search}
      setSearch={s => setTaskFilters({ search: s })}
      developers={developers()}
      selectedDevelopers={selectedDevelopers}
      setDevelopers={s => setTaskFilters({ developers: s })}
      className={cn({ 'px-4': view === 'kanban' })}
    />
  );

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Tabs defaultSelectedKey={view} onPress={setView}>
      <Tab key="table" title="Table">
        {renderTaskFilter}
        <TaskTable
          columns={columns}
          data={filteredTasks}
          tasks={tasks}
          summary={
            <TableRow className="border-content3 border-t">
              <TableCell />
              <TableCell />
              <TableCell>
                <div className="flex w-full overflow-hidden rounded">
                  {statuses.map(status => {
                    const pct = getPercentage('status', status);
                    if (pct === 0) return null;
                    return (
                      <Chip
                        key={status}
                        color={statusColors[status]}
                        radius="none"
                        size="sm"
                        style={{ width: `${pct}%` }}
                        className="w-auto max-w-auto"
                        title={`${status}: ${pct}%`}
                      />
                    );
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex w-full overflow-hidden rounded">
                  {priorities.map(priority => {
                    const pct = getPercentage('priority', priority);
                    if (pct === 0) return null;
                    return (
                      <Chip
                        key={priority}
                        color={priorityColors[priority]}
                        radius="none"
                        size="sm"
                        style={{ width: `${pct}%` }}
                        className="w-auto max-w-auto"
                        title={`${status}: ${pct}%`}
                      />
                    );
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex w-full overflow-hidden rounded">
                  {types.map(type => {
                    const pct = getPercentage('type', type);
                    if (pct === 0) return null;
                    return (
                      <Chip
                        key={type}
                        color={typeColors[type]}
                        radius="none"
                        size="sm"
                        style={{ width: `${pct}%` }}
                        className="w-auto max-w-auto"
                        title={`${status}: ${pct}%`}
                      />
                    );
                  })}
                </div>
              </TableCell>
              <TableCell />
              <TableCell className="font-bold">
                {filteredTasks.reduce((sum, task) => sum + task['Estimated SP'], 0)}
              </TableCell>
              <TableCell className="font-bold">
                {filteredTasks.reduce((sum, task) => sum + task['Actual SP'], 0)}
              </TableCell>
            </TableRow>
          }
        />
      </Tab>
      <Tab key="kanban" title="Kanban" className="-mx-4">
        {renderTaskFilter}
        <TaskKanban data={filteredTasks} />
      </Tab>
    </Tabs>
  );
}

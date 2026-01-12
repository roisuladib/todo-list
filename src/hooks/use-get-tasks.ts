import type { Task, TaskStatus } from '^/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaskStore {
  tasks: Task[];
  hasHydrated: boolean;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: number, task: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  moveTaskById: (taskId: number, toStatus: TaskStatus, toIndex: number) => void;
  getTaskById: (id: number) => Task | undefined;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      hasHydrated: false,
      setTasks: tasks => set({ tasks }),
      addTask: task => {
        const _tasks = get().tasks;
        const newTask: Task = {
          ...task,
          id: _tasks.length > 0 ? Math.max(..._tasks.map(d => d.id)) + 1 : 1,
          createdAt: new Date().toISOString(),
        };
        set(state => ({ tasks: [newTask, ...state.tasks] }));
      },
      updateTask: (id, task) => {
        set(state => ({
          tasks: state.tasks.map(_task => (_task.id === id ? { ..._task, ...task } : _task)),
        }));
      },
      moveTaskById(taskId, toStatus, toIndex) {
        set(state => {
          const tasks = [...state.tasks];

          const fromIndex = tasks.findIndex(t => t.id === taskId);
          if (fromIndex === -1) return state;

          const task = tasks[fromIndex];

          tasks.splice(fromIndex, 1);

          const updatedTask = {
            ...task,
            status: toStatus,
          };

          const sameStatusTasks = tasks.filter(t => t.status === toStatus);

          const insertAt =
            toIndex >= sameStatusTasks.length
              ? tasks.length
              : tasks.findIndex(t => t.id === sameStatusTasks[toIndex]?.id);

          tasks.splice(insertAt === -1 ? tasks.length : insertAt, 0, updatedTask);

          return { tasks };
        });
      },
      getTaskById: id => get().tasks.find(task => task.id === id),
    }),
    {
      name: 'task-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);

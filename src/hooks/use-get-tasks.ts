import type { Task } from '^/types';

import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export function useGetTasks() {
  return useQuery<{ response: boolean; data: Task[] }>({
    queryKey: ['tasks'],
    async queryFn() {
      return fetch('https://mocki.io/v1/bdf8801a-cfb3-4421-bb38-fa9a496bb41b').then(res =>
        res.json(),
      );
    },
  });
}

export interface TaskStore {
  tasks: Task[];
  hasHydrated: boolean;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: number, task: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
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
      getTaskById: id => get().tasks.find(task => task.id === id),
    }),
    {
      name: 'tasks-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);

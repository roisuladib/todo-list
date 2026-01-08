import type { Task } from '^/types';

import dayjs from 'dayjs';

import TaskViewSwitcher from '^/components/task-view-switcher';

function getRandomDateInMonthISO() {
  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');

  const startTime = startOfMonth.valueOf();
  const endTime = endOfMonth.valueOf();

  const randomTime = startTime + Math.random() * (endTime - startTime);

  const randomDate = dayjs(randomTime);
  return randomDate.toISOString();
}

export default async function Home() {
  const res = await fetch('https://mocki.io/v1/bdf8801a-cfb3-4421-bb38-fa9a496bb41b', {
    cache: 'force-cache',
  }).then(res => res.json());

  const data = res as { response: boolean; data: Task[] };

  if (!data.response) {
    return <div>Error loading data</div>;
  }

  let initialTasks = data.data;

  if (!initialTasks.some(task => Object.hasOwn(task, 'id') && Object.hasOwn(task, 'createdAt'))) {
    initialTasks = initialTasks.map((task, index) => ({
      ...task,
      id: index + 1,
      createdAt: getRandomDateInMonthISO(),
    }));
  }

  return <TaskViewSwitcher initialTasks={initialTasks} />;
}

export enum TaskStatus {
  TODO = 'Ready to start',
  IN_PROGRESS = 'In Progress',
  IN_REVIEW = 'Waiting for review',
  PENDING_DEPLOY = 'Pending Deploy',
  DONE = 'Done',
  STUCK = 'Stuck',
}

export enum TaskPriority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  BEST_EFFORT = 'Best Effort',
}

export enum TaskType {
  FEATURE = 'Feature Enhancements',
  OTHER = 'Other',
  BUG = 'Bug',
}

export type Task = {
  id: number;
  title: string;
  developer: string;
  priority: TaskPriority;
  status: TaskStatus;
  type: TaskType;
  'Estimated SP': number;
  'Actual SP': number;
  createdAt: string;
};

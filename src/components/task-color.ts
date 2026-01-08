import type { ChipVariants } from './ui/chip';

import { TaskPriority, TaskStatus, TaskType } from '^/types';

export const statusColors: Record<TaskStatus, ChipVariants['color']> = {
  [TaskStatus.TODO]: 'default',
  [TaskStatus.IN_PROGRESS]: 'warning',
  [TaskStatus.IN_REVIEW]: 'secondary',
  [TaskStatus.PENDING_DEPLOY]: 'primary',
  [TaskStatus.DONE]: 'success',
  [TaskStatus.STUCK]: 'danger',
};

export const priorityColors: Record<TaskPriority, ChipVariants['color']> = {
  [TaskPriority.CRITICAL]: 'danger',
  [TaskPriority.HIGH]: 'warning',
  [TaskPriority.MEDIUM]: 'primary',
  [TaskPriority.LOW]: 'secondary',
  [TaskPriority.BEST_EFFORT]: 'default',
};

export const typeColors: Record<TaskType, ChipVariants['color']> = {
  [TaskType.FEATURE]: 'primary',
  [TaskType.OTHER]: 'default',
  [TaskType.BUG]: 'danger',
};

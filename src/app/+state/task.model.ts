export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum TaskStatus {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Completed = 'completed'
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}



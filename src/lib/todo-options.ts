export const todoStatuses = ["todo", "in_progress", "blocked", "done"] as const;
export const todoPriorities = ["low", "medium", "high", "urgent"] as const;

export type TodoStatusValue = (typeof todoStatuses)[number];
export type TodoPriorityValue = (typeof todoPriorities)[number];

export type TodoSummary = {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatusValue;
  priority: TodoPriorityValue;
  dueDate: Date | null;
  completedAt: Date | null;
  creatorName: string;
  labels: {
    id: string;
    name: string;
    color: string;
  }[];
};

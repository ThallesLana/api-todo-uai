import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  note: z.string().min(3, 'Note must be at least 3 characters long').optional(),
  done: z.boolean().optional(),
  tasklistId: z.string().min(1, 'Tasklist id is required'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long').optional(),
  note: z.string().min(3, 'Note must be at least 3 characters long').optional(),
  done: z.boolean().optional(),
});

export const taskIdSchema = z.object({
  id: z.string().min(1, 'Id is required'),
});

export const tasklistIdSchema = z.object({
  tasklistId: z.string().min(1, 'Tasklist id is required'),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskIdInput = z.infer<typeof taskIdSchema>;
export type TasklistIdInput = z.infer<typeof tasklistIdSchema>;

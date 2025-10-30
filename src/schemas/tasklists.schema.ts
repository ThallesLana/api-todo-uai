import { z } from 'zod';

export const createTasklistSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z.string().min(3, 'Description must be at least 3 characters long').optional(),
  userId: z.string().min(1, 'User id is required'),
});

export const updateTasklistSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
  description: z.string().min(3, 'Description must be at least 3 characters long').optional(),
});

export const tasklistIdSchema = z.object({
  id: z.string().min(1, 'Id is required'),
});

export const userIdSchema = z.object({
  userId: z.string().min(1, 'User id is required'),
});

export type CreateTasklistInput = z.infer<typeof createTasklistSchema>;
export type UpdateTasklistInput = z.infer<typeof updateTasklistSchema>;
export type TasklistIdInput = z.infer<typeof tasklistIdSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;

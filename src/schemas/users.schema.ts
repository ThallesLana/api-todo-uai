import { z } from 'zod';

export const userIdSchema = z.object({
  id: z.string().min(1, 'Id is required'),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
});

export type UserIdInput = z.infer<typeof userIdSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

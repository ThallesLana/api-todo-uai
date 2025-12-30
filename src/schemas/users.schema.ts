import { z } from 'zod';

export const userIdSchema = z.object({
  id: z.string().min(1, 'Id is required'),
});

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email'),
  role: z.enum(['user', 'admin']).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
  googleId: z.string().min(1).optional(),
  picture: z.string().url('Invalid picture url').optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
});

export type UserIdInput = z.infer<typeof userIdSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

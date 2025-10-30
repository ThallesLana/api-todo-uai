import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { apiResponse } from '@/responses/apiResponse.js';

export const validate =
  (schema: ZodObject, source: 'body' | 'params' | 'query' = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[source]);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return apiResponse.error(res, 'Validation error', 400, errors);
      }
      return apiResponse.error(res, 'Validation error');
    }
  };

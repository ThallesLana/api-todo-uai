import { IUser } from '@/models/user.js';
import { apiResponse } from '@/responses/apiResponse.js';
import type { NextFunction, Request, Response } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }

  apiResponse.unauthorized(res, 'Authentication required.');
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user as IUser).role === 'admin') {
    return next();
  }

  apiResponse.unauthorized(res, 'Admin access required.');
}

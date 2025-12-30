import { IUser } from '@/models/user.js';
import { apiResponse } from '@/responses/apiResponse.js';
import { ACCESS_COOKIE_NAME, verifyAccessToken } from '@/config/jwt.js';
import User from '@/models/user.js';
import type { NextFunction, Request, Response } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.cookies?.[ACCESS_COOKIE_NAME];

    if (!token || typeof token !== 'string') {
      apiResponse.unauthorized(res, 'Authentication required.');
      return;
    }

    const payload = verifyAccessToken(token);

    User.findById(payload.sub)
      .select('-__v -passwordHash')
      .then((user) => {
        if (!user) {
          apiResponse.unauthorized(res, 'Authentication required.');
          return;
        }

        req.user = user as unknown as Express.User;
        next();
      })
      .catch((err) => {
        apiResponse.serverError(res, err);
      });
  } catch {
    apiResponse.unauthorized(res, 'Authentication required.');
    return;
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  isAuthenticated(req, res, () => {
    if ((req.user as IUser).role === 'admin') {
      next();
      return;
    }

    apiResponse.forbidden(res, 'Admin access required.');
    return;
  });
}

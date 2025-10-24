import type { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    status: 401,
    error: 'unauthorized',
    message: 'Authentication required.',
  });
}
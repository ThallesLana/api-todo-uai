import { apiResponse } from "@/responses/apiResponse.js";
import type { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if(req.isAuthenticated()) {
    return next();
  }

  apiResponse.unauthorized(res, 'Authentication required.');
}
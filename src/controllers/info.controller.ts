import { apiResponse } from '@/responses/apiResponse.js';
import { Request, Response } from 'express';

export class InfoController {
  static healthCheck = (_req: Request, res: Response) => {
    apiResponse.success(res, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime().toLocaleString('pt-BR'),
      environment: process.env.NODE_ENV || 'development',
      node_version: process.version,
    });
  };

  static info = (_req: Request, res: Response) => {
    apiResponse.success(res, {
      message: "Hello World, i'm alive!",
      docs: `${process.env.BASE_URL}/api-docs`,
      health: `${process.env.BASE_URL}/health`,
      author: 'Thalles Lana',
      repository: 'https://github.com/ThallesLana/todo-uai',
    });
  };
}

import { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: unknown[];
}

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const apiResponse = {
  success: <T>(res: Response, data: T, message?: string, statusCode: number = HttpStatus.OK) => {
    return res.status(statusCode).json({
      success: true,
      statusCode: statusCode,
      data,
      ...(message && { message }),
    } as ApiResponse<T>);
  },

  error: (
    res: Response,
    message: string,
    statusCode: number = HttpStatus.BAD_REQUEST,
    errors?: unknown[],
  ) => {
    return res.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      error: message,
      ...(errors && { errors }),
    } as ApiResponse);
  },

  serverError: (res: Response, error: unknown) => {
    console.error('Server Error:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Server error',
    } as ApiResponse);
  },

  notFound: (res: Response, resource = 'Recurso') => {
    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      error: `${resource} não encontrado`,
    } as ApiResponse);
  },

  unauthorized: (res: Response, message = 'Não autorizado') => {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: HttpStatus.UNAUTHORIZED,
      error: message,
    } as ApiResponse);
  },

  forbidden: (res: Response, message = 'Acesso negado') => {
    return res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      statusCode: HttpStatus.FORBIDDEN,
      error: message,
    } as ApiResponse);
  },
};

import { apiResponse } from '@/responses/apiResponse.js';
import { UsersService } from '@/services/users.service.js';
import { Request, Response } from 'express';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async getAll(_req: Request, res: Response) {
    try {
      const users = await this.usersService.getAll();
      return apiResponse.success(res, users);
    } catch (err) {
      return apiResponse.error(res, 'Error on get users: ' + err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const user = await this.usersService.getOne(id);

      return apiResponse.success(res, user);
    } catch (err) {
      return apiResponse.error(res, 'Error on get user: ' + err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const user = await this.usersService.update(id, req.body);

      return apiResponse.success(res, user);
    } catch (err) {
      return apiResponse.error(res, 'Error on update user: ' + err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      await this.usersService.delete(id);

      return apiResponse.success(res, 'User deleted successfully');
    } catch (err) {
      return apiResponse.error(res, 'Error on delete user: ' + err);
    }
  }
}

import { apiResponse } from '@/responses/apiResponse.js';
import { TasklistService } from '@/services/tasklists.service.js';
import { Request, Response } from 'express';

export class TasklistController {
  private tasklistService: TasklistService;

  constructor() {
    this.tasklistService = new TasklistService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return apiResponse.error(res, 'User id is required');
      }

      const tasklists = await this.tasklistService.getAll(userId);
      return apiResponse.success(res, tasklists);
    } catch (err) {
      return apiResponse.error(res, 'Error on get tasklists: ' + err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const tasklist = await this.tasklistService.getOne(id);
      return apiResponse.success(res, tasklist);
    } catch (err) {
      return apiResponse.error(res, 'Error on get tasklist: ' + err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const tasklist = await this.tasklistService.create(req.body);

      return apiResponse.success(res, tasklist);
    } catch (err) {
      return apiResponse.error(res, 'Error on create tasklist: ' + err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const tasklist = await this.tasklistService.update(id, req.body);

      return apiResponse.success(res, tasklist);
    } catch (err) {
      return apiResponse.error(res, 'Error on update tasklist: ' + err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      await this.tasklistService.delete(id);

      return apiResponse.success(res, 'Tasklist deleted successfully');
    } catch (err) {
      return apiResponse.error(res, 'Error on delete tasklist: ' + err);
    }
  }
}

import { apiResponse } from '@/responses/apiResponse.js';
import { TasklistService } from '@/services/tasklistService.js';
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
      const { name, description, userId } = req.body;

      if (!name) {
        return apiResponse.error(res, 'Name is required');
      }

      if (name.length < 3) {
        return apiResponse.error(res, 'Name must be at least 3 characters long');
      }

      if (description && description.length < 3) {
        return apiResponse.error(res, 'Description must be at least 3 characters long');
      }

      if (!userId) {
        return apiResponse.error(res, 'User id is required');
      }

      const tasklist = await this.tasklistService.create({
        name,
        description,
        userId,
      });

      return apiResponse.success(res, tasklist);
    } catch (err) {
      return apiResponse.error(res, 'Error on create tasklist: ' + err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const updateData: { name?: string; description?: string } = {};

      if (name) {
        if (name.length < 3) {
          return apiResponse.error(res, 'Name must be at least 3 characters long');
        }

        updateData.name = name;
      }

      if (description) {
        if (description.length < 3) {
          return apiResponse.error(res, 'Description must be at least 3 characters long');
        }

        updateData.description = description;
      }

      if (Object.keys(updateData).length === 0) {
        return apiResponse.error(res, 'No fields to update provided');
      }

      const tasklist = await this.tasklistService.update(id, updateData);

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

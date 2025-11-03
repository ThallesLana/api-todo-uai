import { apiResponse } from '@/responses/apiResponse.js';
import { TasksService } from '@/services/tasks.service.js';
import { Request, Response } from 'express';

export class TasksController {
  private tasksService: TasksService;

  constructor() {
    this.tasksService = new TasksService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const { tasklistId } = req.params;

      if (!tasklistId) {
        return apiResponse.error(res, 'Tasklist id is required');
      }

      const tasks = await this.tasksService.getAll(tasklistId);
      return apiResponse.success(res, tasks);
    } catch (err) {
      return apiResponse.error(res, 'Error on get tasks: ' + err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const task = await this.tasksService.getOne(id);
      return apiResponse.success(res, task);
    } catch (err) {
      return apiResponse.error(res, 'Error on get task: ' + err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const task = await this.tasksService.create(req.body);

      return apiResponse.success(res, task);
    } catch (err) {
      return apiResponse.error(res, 'Error on create task: ' + err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      const task = await this.tasksService.update(id, req.body);

      return apiResponse.success(res, task);
    } catch (err) {
      return apiResponse.error(res, 'Error on update task: ' + err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return apiResponse.error(res, 'Id is required');
      }

      await this.tasksService.delete(id);

      return apiResponse.success(res, 'Task deleted successfully');
    } catch (err) {
      return apiResponse.error(res, 'Error on delete task: ' + err);
    }
  }
}

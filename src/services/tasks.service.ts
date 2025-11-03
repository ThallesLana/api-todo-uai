import Task, { ITask, ITaskCreate } from '@/models/tasks.js';
import mongoose from 'mongoose';

export class TasksService {
  private tasksModel: mongoose.Model<ITask>;

  constructor() {
    this.tasksModel = Task;
  }

  async getAll(tasklistId: string) {
    return await this.tasksModel.find({ tasklistId: tasklistId }).select('-__v');
  }

  async getOne(id: string) {
    const task = await this.tasksModel.findById(id).select('-__v');

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async create(taskData: ITaskCreate) {
    const task = await this.tasksModel.create(taskData);
    const taskObj = task.toObject();
    delete taskObj.__v;
    return taskObj;
  }

  async update(id: string, updateData: Partial<ITask>) {
    const task = await this.tasksModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .select('-__v');

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async delete(id: string) {
    const task = await this.tasksModel.findByIdAndDelete(id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }
}

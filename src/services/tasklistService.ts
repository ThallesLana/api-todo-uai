import Tasklist, { ITasklist, ITasklistCreate } from '@/models/tasklist.js';
import mongoose from 'mongoose';

export class TasklistService {
  private tasklistModel: mongoose.Model<ITasklist>;

  constructor() {
    this.tasklistModel = Tasklist;
  }

  async getAll(userId: string) {
    return await this.tasklistModel.find({ userId: userId }).select('-__v');
  }

  async getOne(id: string) {
    const tasklist = await this.tasklistModel.findById(id).select('-__v');

    if (!tasklist) {
      throw new Error('Tasklist not found');
    }

    return tasklist;
  }

  async create(tasklistData: ITasklistCreate) {
    const tasklist = await this.tasklistModel.create(tasklistData);
    return tasklist;
  }

  async update(id: string, updateData: Partial<ITasklist>) {
    const tasklist = await this.tasklistModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .select('-__v');

    if (!tasklist) {
      throw new Error('Tasklist not found');
    }

    return tasklist;
  }

  async delete(id: string) {
    const tasklist = await this.tasklistModel.findByIdAndDelete(id);

    if (!tasklist) {
      throw new Error('Tasklist not found');
    }

    return tasklist;
  }
}

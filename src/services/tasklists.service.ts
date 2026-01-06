import Tasklist, { ITasklist, ITasklistCreate } from '@/models/tasklist.js';
import mongoose from 'mongoose';

export class TasklistService {
  private tasklistModel: mongoose.Model<ITasklist>;

  constructor() {
    this.tasklistModel = Tasklist;
  }

  async getAll(userId: string) {
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error('Invalid userId');
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    return await this.tasklistModel.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'tasklistId',
          as: 'tasks',
        },
      },
      {
        $addFields: {
          tasksCount: {
            $size: '$tasks',
          },
        },
      },
      {
        $project: {
          __v: 0,
          tasks: 0,
        },
      },
    ]);
  }

  async getOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid tasklist id');
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const result = await this.tasklistModel.aggregate([
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'tasklistId',
          as: 'tasks',
        },
      },
      {
        $addFields: {
          tasksCount: {
            $size: '$tasks',
          },
        },
      },
      {
        $project: {
          __v: 0,
          tasks: 0,
        },
      },
    ]);

    const tasklist = result[0];

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

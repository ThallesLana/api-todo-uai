import mongoose, { Document, Types } from 'mongoose';

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  note?: string;
  done: boolean;
  tasklistId: Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskCreate {
  title: string;
  note?: string;
  done: boolean;
  tasklistId: Types.ObjectId | string;
}

const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: false,
    },
    done: {
      type: Boolean,
      require: true,
      default: false,
    },
    tasklistId: {
      type: Types.ObjectId,
      require: true,
      ref: 'Tasklist',
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<ITask>('Task', tasksSchema);

export default Task;

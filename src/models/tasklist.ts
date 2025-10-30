import mongoose, { Document, Types } from 'mongoose';

export interface ITasklist extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITasklistCreate {
  name: string;
  description?: string;
  userId: Types.ObjectId | string;
}

const tasklistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    userId: {
      type: Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const Tasklist = mongoose.model<ITasklist>('Tasklist', tasklistSchema);

export default Tasklist;

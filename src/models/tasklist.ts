import mongoose, { Document, Types } from 'mongoose';

export enum ListColor {
  blue_light = '#87CEEB',
  green_light = '#98FF98',
  red_light = '#f54b4bff',
  yellow = '#FFFACD',
  orange = '#FFDAB9',

  blue_dark = '#001F3F',
  green_dark = '#228B22',
  red_dark = '#800020',
  gray = '#2F4F4F',
  purple = '#8E4585',
}

export interface ITasklist extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  color?: ListColor;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITasklistCreate {
  name: string;
  description?: string;
  color?: ListColor;
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
    color: {
      type: String,
      enum: Object.values(ListColor),
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

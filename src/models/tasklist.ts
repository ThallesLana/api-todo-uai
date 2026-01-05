import mongoose, { Document, Types } from 'mongoose';

export enum ListColor {
  BLUE_LIGHT = 'blue_light',
  GREEN_LIGHT = 'green_light',
  RED_LIGHT = 'red_light',
  YELLOW = 'yellow',
  ORANGE = 'orange',

  BLUE_DARK = 'blue_dark',
  GREEN_DARK = 'green_dark',
  RED_DARK = 'red_dark',
  GRAY = 'gray',
  PURPLE = 'purple',
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

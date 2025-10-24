import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
   _id: Types.ObjectId;
  googleId: string;
  email: string;
  name: string;
  role: "user" | "admin";
  picture: string;
  createdAt: Date;
  lastLogin: Date;
}

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.model<IUser>("User", userSchema);

export default User;
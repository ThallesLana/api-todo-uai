import User, { IUser } from "@/models/user.js";
import mongoose from "mongoose";

export class UsersService {
  private userModel: mongoose.Model<IUser>;

  constructor() {
    this.userModel = User;
  }

  async getAll() {
    return await this.userModel.find().select('-__v');
  }

  async getOne(id: string) {
    const user = await this.userModel.findById(id).select('-__v');

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, updateData: Partial<IUser>) {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true
    }).select('-__v');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    if(!user) {
      throw new Error('User not found');
    }
  }
}
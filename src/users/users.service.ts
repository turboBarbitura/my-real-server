import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: { email: string; password: string }): Promise<User> {
    const newUser = new this.userModel({
      email: userData.email,
      password: userData.password,
      isEmailVerified: false
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updatePassword(id: string, password: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { password },
      { new: true }
    ).exec();
  }

  async verifyEmail(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { isEmailVerified: true },
      { new: true }
    ).exec();
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

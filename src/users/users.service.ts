import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ name, email, password });
    return newUser.save();
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}

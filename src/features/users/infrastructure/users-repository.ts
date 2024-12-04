import { Injectable } from '@nestjs/common';
import { BlogsRepository } from '../../bloggers-platform/blogs/infrastructure/blogs-repository';
import { PostsRepository } from '../../bloggers-platform/posts/infrastructure/posts-repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserInputDto, UserViewDto } from '../dto/usersDto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }
  async createUser(body: CreateUserInputDto):Promise<string>{
    const res = await this.userModel.create(body)
    return res._id.toString()
  }
  async getUserById(id: string): Promise<string|null> {
    const result = await  this.userModel.findOne({_id: new ObjectId(id)})
    if(!result) {return null}
    return result._id.toString()
  }
  async deleteUserById(id:string): Promise<void|null> {
    await this.userModel.deleteOne({_id: new ObjectId(id)}).exec()
  }

  async deleteAllData(){
    await this.userModel.deleteMany({})
  }
}

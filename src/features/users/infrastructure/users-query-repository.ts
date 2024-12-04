import { Injectable } from '@nestjs/common';
import { BlogsRepository } from '../../bloggers-platform/blogs/infrastructure/blogs-repository';
import { PostsRepository } from '../../bloggers-platform/posts/infrastructure/posts-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../../bloggers-platform/blogs/schemas/blog.schema';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { ObjectId } from 'mongodb';
import { UsersOutputModelMapper, UserViewDto } from '../dto/usersDto';
import { FullPagination, PaginationOutput } from '../../../common/pagination/paginationBase';
import { BlogsOutputModelMapper, BlogViewDto } from '../../bloggers-platform/blogs/dto/blogsDto';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async getAll(pagination: FullPagination): Promise<PaginationOutput<UserViewDto>>{
    // const filter: FilterQuery<Blog> = {};

    // if (pagination.searchLoginTerm) {
    //   filter.login = { $regex: pagination.searchLoginTerm, $options: 'i' };  // Присваиваем значение, а не push
    // }
    //
    // if (pagination.searchEmailTerm) {
    //   filter.email = { $regex: pagination.searchEmailTerm, $options: 'i' };  // Присваиваем значение, а не push
    // }
    const filter: FilterQuery<User> = {
      $or: [
        { 'email': { $regex: pagination.searchEmailTerm ?? '', $options: 'i' } },
        { 'login': { $regex: pagination.searchLoginTerm ?? '', $options: 'i' } },
      ],
    }
    return this.getPaginationResult(pagination, filter)
  }
    async getPaginationResult(pagination: FullPagination, filter:FilterQuery<User>): Promise<PaginationOutput<UserViewDto>>{
    const users = await this.userModel
      .find(filter)
      .sort({[pagination.sortBy]: pagination.getSortDirectionInNumericFormat()})
      .skip(pagination.getSkipItemsCount())
      .limit(pagination.pageSize)

    const totalCount = await this.userModel.countDocuments(filter);
    const mappedUsers = users.map(this.userOutputMapper)
    return  new PaginationOutput<UserViewDto>(mappedUsers, pagination.pageNumber, pagination.pageSize, totalCount)
  }

  private userOutputMapper(user:User):UserViewDto {
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    }

  }


  async getUserById(id: string): Promise<UserViewDto> {
    const result = await  this.userModel.findOne({_id: new ObjectId(id)})

    return {
      id: result!._id.toString(),
      login: result!.login,
      email: result!.email,
      createdAt: result!.createdAt.toISOString(),
    }
  }


}

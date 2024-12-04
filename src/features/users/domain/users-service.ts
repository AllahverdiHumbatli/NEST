import { HttpException, Injectable } from '@nestjs/common';
import { BlogsRepository } from '../../bloggers-platform/blogs/infrastructure/blogs-repository';
import { PostsRepository } from '../../bloggers-platform/posts/infrastructure/posts-repository';
import { UsersRepository } from '../infrastructure/users-repository';
import { UsersQueryRepository } from '../infrastructure/users-query-repository';
import { CreateUserInputDto, UserViewDto } from '../dto/usersDto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersQueryRepository :UsersQueryRepository) {}

  async createUser(body: CreateUserInputDto):Promise<string>{
       return await this.usersRepository.createUser(body)
  }
  async deleteUser(id: string) {
    const user: string | null = await this.usersRepository.getUserById(id)
    if (!user) {
      throw new HttpException('Blog not found', 404);
    }
    await this.usersRepository.deleteUserById(id)
  }



}

import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './features/bloggers-platform/blogs/infrastructure/blogs-repository';
import { PostsRepository } from './features/bloggers-platform/posts/infrastructure/posts-repository';
import { UsersRepository } from './features/users/infrastructure/users-repository';

@Injectable()
export class AppService {
  constructor(
              private blogsRepository: BlogsRepository,
              private postsRepository :PostsRepository,
              private usersRepository: UsersRepository) {}

 async deleteAllData(){
   await Promise.all([
      this.blogsRepository.deleteAllData(),
     this.postsRepository.deleteAllData(),
     this.usersRepository.deleteAllData(),

   ])
 }
}

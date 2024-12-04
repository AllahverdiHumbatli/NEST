import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from '../bloggers-platform/blogs/schemas/blog.schema';
import { Post, PostSchema } from '../bloggers-platform/posts/schemas/post.schema';
import { BlogsController } from '../bloggers-platform/blogs/api/blogs-controller';
import { PostsController } from '../bloggers-platform/posts/api/posts-contoller';
import { BlogsService } from '../bloggers-platform/blogs/domain/blogs-service';
import { BlogsRepository } from '../bloggers-platform/blogs/infrastructure/blogs-repository';
import { BlogsQueryRepository } from '../bloggers-platform/blogs/infrastructure/blogs-query-repository';
import { PostsService } from '../bloggers-platform/posts/domain/posts-service';
import { PostsRepository } from '../bloggers-platform/posts/infrastructure/posts-repository';
import { PostsQueryRepository } from '../bloggers-platform/posts/infrastructure/posts-query-repository';
import { UsersController } from './api/users-contoller';
import { UsersService } from './domain/users-service';
import { UsersRepository } from './infrastructure/users-repository';
import { UsersQueryRepository } from './infrastructure/users-query-repository';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]
  )
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersQueryRepository],
  exports: [UsersService, UsersRepository, UsersQueryRepository]
})
export class UsersModule {}
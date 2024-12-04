import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/schemas/blog.schema';
import { BlogsController } from './blogs/api/blogs-controller';
import { BlogsService } from './blogs/domain/blogs-service';
import { BlogsRepository } from './blogs/infrastructure/blogs-repository';
import { BlogsQueryRepository } from './blogs/infrastructure/blogs-query-repository';
import { Post, PostSchema } from './posts/schemas/post.schema';
import { PostsController } from './posts/api/posts-contoller';
import { PostsService } from './posts/domain/posts-service';
import { PostsQueryRepository } from './posts/infrastructure/posts-query-repository';
import { PostsRepository } from './posts/infrastructure/posts-repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema },  {name: Post.name , schema: PostSchema }],
      )
  ],
  controllers: [BlogsController, PostsController],
  providers: [BlogsService, BlogsRepository, BlogsQueryRepository, PostsService, PostsRepository, PostsQueryRepository],
  exports: [BlogsRepository, BlogsQueryRepository, BlogsService, PostsService, PostsRepository, PostsQueryRepository]
})
export class BloggersPlatformModule {}


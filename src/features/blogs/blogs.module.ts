import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./schemas/blog.schema";
import {BlogsController} from "./api/blogs-controller";
import {BlogsService} from "./domain/blogs-service";
import {BlogsRepository} from "./infrastructure/blogs-repository";
import {BlogsQueryRepository} from "./infrastructure/blogs-query-repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
    controllers:[BlogsController],
    providers:[BlogsService, BlogsRepository, BlogsQueryRepository],
    exports: [BlogsRepository, BlogsQueryRepository],
})
export class BlogsModule {}

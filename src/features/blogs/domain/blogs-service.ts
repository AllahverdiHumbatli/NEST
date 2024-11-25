import { Injectable } from '@nestjs/common';
import {CreateOrUpdateBlogInputDto, DataForCreatingBlog} from "../dto/blogsDto";
import {BlogsRepository} from "../infrastructure/blogs-repository";
import {Blog} from "../schemas/blog.schema";


@Injectable()
export class BlogsService{
    constructor(private readonly blogsRepository: BlogsRepository) {
    }
    async createBlog(CreateBlogDto: CreateOrUpdateBlogInputDto): Promise<string> {

            const newBlogDto: DataForCreatingBlog = {
                ...CreateBlogDto,
                isMembership: true
            }

            return await this.blogsRepository.createBlog(newBlogDto)
    }
}

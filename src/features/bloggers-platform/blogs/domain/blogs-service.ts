import { HttpException, Injectable } from '@nestjs/common';
import {CreateOrUpdateBlogInputDto, DataForCreatingBlog} from "../dto/blogsDto";
import {BlogsRepository} from "../infrastructure/blogs-repository";
import {Blog} from "../schemas/blog.schema";
import { CreateOrUpdatePostInputDto } from '../../posts/dto/postsDto';


@Injectable()
export class BlogsService{
    constructor(private readonly blogsRepository: BlogsRepository) {
    }
    async createBlog(CreateBlogDto: CreateOrUpdateBlogInputDto): Promise<string> {

            const newBlogDto: DataForCreatingBlog = {
                ...CreateBlogDto,
                isMembership: false
            }

            return await this.blogsRepository.createBlog(newBlogDto)
    }
  async updateBlog(id: string, body: CreateOrUpdateBlogInputDto){
    const isBlogExists: string | null = await this.blogsRepository.getBlogById(id)
    if(!isBlogExists){
      throw new HttpException('Blog not found', 404);
    }
    await this.blogsRepository.updateBlog(id, body)
  }

  async deleteBlog(id: string){
    const isBlogExists: string | null = await this.blogsRepository.getBlogById(id)
    if(!isBlogExists){
      throw new HttpException('Blog not found', 404);
    }
    await this.blogsRepository.deleteBlogById(id)
  }
}

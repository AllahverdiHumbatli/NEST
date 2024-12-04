import { HttpException, Injectable } from '@nestjs/common';
import { BlogsRepository } from '../../blogs/infrastructure/blogs-repository';
import { CreateOrUpdateBlogInputDto, DataForCreatingBlog } from '../../blogs/dto/blogsDto';
import { CreateOrUpdatePostInputDto, CreatePostByBlogIdFromUriParams, DataForCreatingPost } from '../dto/postsDto';
import { BlogsQueryRepository } from '../../blogs/infrastructure/blogs-query-repository';
import { PostsRepository } from '../infrastructure/posts-repository';
import { BlogsService } from '../../blogs/domain/blogs-service';

@Injectable()
export class PostsService{
  constructor(
    private readonly postsRepository: PostsRepository, private readonly blogsQueryRepository: BlogsQueryRepository,
    private readonly blogsRepository: BlogsRepository,
  ) {
  }
  async createPost(CreatePostDto: CreateOrUpdatePostInputDto): Promise<string> {
    const blog = await this.blogsQueryRepository.getBlogById(CreatePostDto.blogId.toString())
    const newPostDto: DataForCreatingPost = {
      ...CreatePostDto,
      blogName: blog!.name,
    }

    return await this.postsRepository.createPost(newPostDto)
  }
  async createPostWithBlogIdFromUriParam(postInputDTO: CreateOrUpdatePostInputDto, id: string){
        const isBlogExists: string | null = await this.blogsRepository.getBlogById(id)
        if(!isBlogExists){
          throw new HttpException('Blog not found', 404);
        }
        postInputDTO['blogId'] = id
        return await this.createPost(postInputDTO)
  }
  async updatePost(id: string, body: CreateOrUpdatePostInputDto){
    const isPostExist: string | null = await this.postsRepository.getPostById(id)
    if(!isPostExist){
      throw new HttpException('Blog not found', 404);
    }
        await this.postsRepository.updatePost(id, body)
  }

  async deletePost(id: string){
    const isPostExist: string | null = await this.postsRepository.getPostById(id)
    if(!isPostExist){
      throw new HttpException('Blog not found', 404);
    }
      await this.postsRepository.deletePost(id)
  }

}

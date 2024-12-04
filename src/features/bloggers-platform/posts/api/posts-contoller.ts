import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { PostsQueryRepository } from '../infrastructure/posts-query-repository';
import { PostsService } from '../domain/posts-service';
import { PostsRepository } from '../infrastructure/posts-repository';
import { CreateOrUpdatePostInputDto, PostViewDto } from '../dto/postsDto';
import { FullPagination, PaginationOutput, PaginationType } from '../../../../common/pagination/paginationBase';
import { BlogViewDto } from '../../blogs/dto/blogsDto';
import { SortingPropertiesType } from '../../../../common/types/sortingPropertiesType';

@Controller('posts')
export class PostsController {
  constructor(
    private postsQueryRepository: PostsQueryRepository,
    private postService: PostsService,
    private postRepository: PostsRepository
  ) {}
  @Get()
  async getAll(
    // Для работы с query
    @Query() query: PaginationType
  ):Promise<PaginationOutput<PostViewDto>>{
    const POST_SORTING_PROPERTIES: SortingPropertiesType<PostViewDto> = ["blogName"];

    const paginationProperties: FullPagination = new FullPagination(query, POST_SORTING_PROPERTIES)

    const posts:PaginationOutput<PostViewDto> = await this.postsQueryRepository.getAll(paginationProperties)
    return posts
  }
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostViewDto> {

    const post: PostViewDto | null = await this.postsQueryRepository.getPostById(id)
    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    return post;
  }
  @Post()
  async createPost(@Body() body: CreateOrUpdatePostInputDto): Promise<PostViewDto> {
    const postId = await this.postService.createPost(body);
    return await this.getPostById(postId);
  }
  @Put(':id')
  @HttpCode(204)
  async updatePost(
    @Param('id') id: string,
    @Body() body: CreateOrUpdatePostInputDto,
  ): Promise<void> {
    await this.postService.updatePost(id, body)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteBlogById(@Param('id') id: string): Promise<void> {
    await this.postService.deletePost(id)
  }
}

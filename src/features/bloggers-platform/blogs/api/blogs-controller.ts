import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import {BlogsService} from "../domain/blogs-service";
import { BlogViewDto, CreateOrUpdateBlogInputDto} from "../dto/blogsDto";
import {BlogsQueryRepository} from "../infrastructure/blogs-query-repository";
import {BlogsRepository} from "../infrastructure/blogs-repository";
import { FullPagination, PaginationOutput, PaginationType } from '../../../../common/pagination/paginationBase';
import { PostsService } from '../../posts/domain/posts-service';
import { CreateOrUpdatePostInputDto, CreatePostByBlogIdFromUriParams, PostViewDto } from '../../posts/dto/postsDto';
import { PostsQueryRepository } from '../../posts/infrastructure/posts-query-repository';
import { SortingPropertiesType } from '../../../../common/types/sortingPropertiesType';


@Controller('blogs')
export class BlogsController {
    constructor(
        private blogsQueryRepository: BlogsQueryRepository,
        private blogsService: BlogsService,
        private postService : PostsService,
        private postQueryRepository: PostsQueryRepository
    ) {}

    @Get()
    async getAll(
        // Для работы с query
        @Query() query: PaginationType
    ):Promise<PaginationOutput<BlogViewDto>>{

        const BLOGS_SORTING_PROPERTIES: SortingPropertiesType<BlogViewDto> = ["name"];

        const paginationProperties: FullPagination = new FullPagination(query, BLOGS_SORTING_PROPERTIES)

        const blogs:PaginationOutput<BlogViewDto> = await this.blogsQueryRepository.getAll(paginationProperties)
        return blogs
    }
    @Get(':id/posts')
    async getALLPostsForSpecifiedBlog(
      @Query() query: any,
      @Param('id') id: string
    ):Promise<PaginationOutput<PostViewDto>>{

        const blog: BlogViewDto | null = await this.blogsQueryRepository.getBlogById(id)
        if (!blog) {
            throw new HttpException('Blog not found', 404);
        }

        const POST_SORTING_PROPERTIES: SortingPropertiesType<PostViewDto> = ["blogName"];

        const paginationProperties: FullPagination = new FullPagination(query, POST_SORTING_PROPERTIES)

        const posts:PaginationOutput<PostViewDto> = await this.postQueryRepository.getAll(paginationProperties, id)
        return posts
    }

    @Get(':id')
    async getBlogById(@Param('id') id: string): Promise<BlogViewDto> {

    const blog: BlogViewDto | null = await this.blogsQueryRepository.getBlogById(id)
        if (!blog) {
            throw new HttpException('Blog not found', 404);
        }
        return blog;
    }
    @Post()
    async createBlog(@Body() body: CreateOrUpdateBlogInputDto): Promise<BlogViewDto> {
        const blogId = await this.blogsService.createBlog(body);
        return await this.getBlogById(blogId);
    }
    @HttpCode(201)
    @Post(':id/posts')
    async createPostByBlogId(
      @Body() body: CreateOrUpdatePostInputDto,
      @Param('id') id: string): Promise<PostViewDto | null> {
       const postId = await this.postService.createPostWithBlogIdFromUriParam(body, id)
        return await this.postQueryRepository.getPostById(postId);
    }
    @Put(':id')
    @HttpCode(204)
    async updateBlog(
        @Param('id') id: string,
        @Body() body: CreateOrUpdateBlogInputDto,
    ): Promise<void> {
        await this.blogsService.updateBlog(id, body)
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteBlogById(@Param('id') id: string): Promise<void> {
        await this.blogsService.deleteBlog(id)
    }
}

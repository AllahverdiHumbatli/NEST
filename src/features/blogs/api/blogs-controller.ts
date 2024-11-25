import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {BlogsService} from "../domain/blogs-service";
import { BlogViewDto, CreateOrUpdateBlogInputDto} from "../dto/blogsDto";
import {BlogsQueryRepository} from "../infrastructure/blogs-query-repository";
import {BlogsRepository} from "../infrastructure/blogs-repository";
import {FullPagination} from "../../../common/pagination/paginationBase";
import {BLOGS_SORTING_PROPERTIES} from "../../../common/constants";


@Controller('blogs')
export class BlogsController {
    constructor(
        private blogsQueryRepository: BlogsQueryRepository,
        private blogsService: BlogsService,
        private blogsRepository: BlogsRepository
    ) {}
    @Get()
    async getAll(
        // Для работы с query
        @Query() query: any
    ){

        const paginationPropersties: FullPagination = new FullPagination(query, BLOGS_SORTING_PROPERTIES)
        const blogs = await this.blogsQueryRepository.getAll(paginationPropersties)
        return blogs
    }
    @Get(':id')
    async getBlogById(@Param('id') id: string): Promise<BlogViewDto> {
    return this.blogsQueryRepository.getBlogById(id);
    }
    @Post()
    async createBlog(@Body() body: CreateOrUpdateBlogInputDto): Promise<BlogViewDto> {
        const blogId = await this.blogsService.createBlog(body);
        return await this.getBlogById(blogId);
    }
    @Put(':id')
    async updateBlog(
        @Param('id') id: string,
        @Body() body: CreateOrUpdateBlogInputDto,
    ): Promise<void> {
        await this.blogsRepository.updateBlog(id, body)
    }

    @Delete(':id')
    async deleteBlogById(@Param('id') id: string): Promise<void> {
        await this.blogsRepository.deleteBlogById(id)
    }
}

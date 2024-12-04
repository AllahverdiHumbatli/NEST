import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Query } from '@nestjs/common';
import { AppService } from '../../../app.service';
import { UsersService } from '../domain/users-service';
import { UsersQueryRepository } from '../infrastructure/users-query-repository';
import { FullPagination, PaginationOutput, PaginationType } from '../../../common/pagination/paginationBase';
import { BlogViewDto, CreateOrUpdateBlogInputDto } from '../../bloggers-platform/blogs/dto/blogsDto';
import { SortingPropertiesType } from '../../../common/types/sortingPropertiesType';
import {  CreateUserInputDto, UserViewDto } from '../dto/usersDto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}
  @Get()
  async getAll(
    // Для работы с query
    @Query() query: PaginationType
  ):Promise<PaginationOutput<UserViewDto>>{


    const paginationProperties: FullPagination = new FullPagination(query, ['login'])

    const users:PaginationOutput<UserViewDto> = await this.usersQueryRepository.getAll(paginationProperties)
    return users
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserViewDto> {

    const user: UserViewDto  = await this.usersQueryRepository.getUserById(id)
    // if (!user) {
    //   throw new HttpException('Blog not found', 404);
    // }
    return user;
  }
  @Post()
  async createUser(@Body() body: CreateUserInputDto): Promise<UserViewDto> {
    const userId:string = await this.usersService.createUser(body);
    return await this.getUserById(userId);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(@Param('id') id: string): Promise<void> {
   return  await this.usersService.deleteUser(id)
  }
}


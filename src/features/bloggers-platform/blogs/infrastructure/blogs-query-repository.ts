import {Injectable} from "@nestjs/common";
import {BlogsRepository} from "./blogs-repository";
import {BlogsOutputModelMapper, BlogViewDto, DataForCreatingBlog} from "../dto/blogsDto";
import {InjectModel} from "@nestjs/mongoose";
import {Blog} from "../schemas/blog.schema";
import {FilterQuery, Model,} from "mongoose";
import {ObjectId} from "mongodb";
import {FullPagination, PaginationOutput} from "../../../../common/pagination/paginationBase";


@Injectable()
export class BlogsQueryRepository{
    constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {}
   async getBlogById(id: string): Promise<BlogViewDto | null> {
        const result = await  this.blogModel.findOne({_id: new ObjectId(id)})
     if(!result) {return null}

        return {
            id: result._id.toString(),
            name: result.name,
            description: result.description,
            websiteUrl: result.websiteUrl,
            createdAt: result.createdAt.toISOString(),
            isMembership: result.isMembership
        }
   }

   async getAll(pagination: FullPagination): Promise<PaginationOutput<BlogViewDto>>{
     const filter: FilterQuery<Blog> = {};

     if (pagination.searchNameTerm) {
       filter.name = { $regex: pagination.searchNameTerm, $options: 'i' };  // Присваиваем значение, а не push
     }
       return this.getPaginationResult(pagination, filter)
   }
   async getPaginationResult(pagination: FullPagination, filter:FilterQuery<Blog>): Promise<PaginationOutput<BlogViewDto>>{
        const blogs = await this.blogModel
            .find(filter)
            .sort({[pagination.sortBy]: pagination.getSortDirectionInNumericFormat()})
            .skip(pagination.getSkipItemsCount())
            .limit(pagination.pageSize)

       const totalCount = await this.blogModel.countDocuments(filter);
       const mappedBlogs = blogs.map(this.blogOutputMapper)
       //МОЖЕТ ПЕРЕНЕСТИ МАПЕР В ДРУГОЕ МЕСТО
       return  new PaginationOutput<BlogViewDto>(mappedBlogs, pagination.pageNumber, pagination.pageSize, totalCount)
   }

   private blogOutputMapper(blog:Blog): BlogViewDto {
      return{
        id:  blog._id.toString(),
        name:  blog.name,
        description : blog.description,
        websiteUrl : blog.websiteUrl,
        createdAt : blog.createdAt.toISOString(),
        isMembership : blog.isMembership,
      }
   }
}

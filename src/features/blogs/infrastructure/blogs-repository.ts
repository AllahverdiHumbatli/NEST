import {Blog} from "../schemas/blog.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {CreateOrUpdateBlogInputDto, DataForCreatingBlog} from "../dto/blogsDto";
import {ObjectId} from "mongodb";

@Injectable()
export class BlogsRepository {
    constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {
    }

    async createBlog(CreateBlogDto: DataForCreatingBlog): Promise<string> {
        const res = await this.blogModel.create(CreateBlogDto)
        return res._id.toString()
    }
    async updateBlog(id:string, dtoForUpdateBlog: CreateOrUpdateBlogInputDto):Promise<void> {
        await this.blogModel.updateOne({_id: new ObjectId(id)}, dtoForUpdateBlog)
    }
    async deleteBlogById(id:string): Promise<void> {
        const result = await this.blogModel.deleteOne({_id: new ObjectId(id)}).exec()
        console.log("bbbbbbb", result);
    }
}
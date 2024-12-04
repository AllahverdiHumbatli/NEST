import {Blog} from "../schemas/blog.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import { BlogViewDto, CreateOrUpdateBlogInputDto, DataForCreatingBlog } from '../dto/blogsDto';
import {ObjectId} from "mongodb";

@Injectable()
export class BlogsRepository {
    constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {
    }
    async getBlogById(id: string): Promise<string | null> {
        const result = await this.blogModel.findOne({ _id: new ObjectId(id) })
        if (!result) {
            return null
        }
        return result._id.toString()
    }
        async createBlog(CreateBlogDto: DataForCreatingBlog): Promise<string> {
        const res = await this.blogModel.create(CreateBlogDto)
        return res._id.toString()
    }
    async updateBlog(id:string, dtoForUpdateBlog: CreateOrUpdateBlogInputDto):Promise<void|null> {
        await this.blogModel.updateOne({_id: new ObjectId(id)}, dtoForUpdateBlog)
    }
    async deleteBlogById(id:string): Promise<void|null> {
       await this.blogModel.deleteOne({_id: new ObjectId(id)}).exec()
    }
    async deleteAllData(){
        await this.blogModel.deleteMany({})
    }
}
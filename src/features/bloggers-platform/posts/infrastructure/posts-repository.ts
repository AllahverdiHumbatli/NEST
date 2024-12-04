import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Post } from '../schemas/post.schema';
import { CreateOrUpdatePostInputDto, DataForCreatingPost, PostViewDto } from '../dto/postsDto';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {
  }
  async createPost(CreatePostDto: DataForCreatingPost): Promise<string> {
    const res = await this.postModel.create(CreatePostDto)
    return res._id.toString()
  }

  async getPostById(id: string): Promise<string | null> {
    const result = await this.postModel.findOne({ _id: new ObjectId(id) })
    if (!result) {
      return null
    }
    return result._id.toString()
  }

  async updatePost(id: string, dtoForUpdatePost: CreateOrUpdatePostInputDto): Promise<void> {
    await this.postModel.updateOne({ _id: new ObjectId(id) }, dtoForUpdatePost)
  }
  async deletePost(id: string){
    await this.postModel.deleteOne({_id: new ObjectId(id)}).exec()
  }
  async deleteAllData(){
    await this.postModel.deleteMany({})
  }
    // async deleteBlogById(id:string): Promise<void|null> {
    //   const result = await  this.blogModel.findOne({_id: new ObjectId(id)})
    //   if(!result) {return null}
    //   await this.blogModel.deleteOne({_id: new ObjectId(id)}).exec()
    // }
    // async deleteAllData(){
    //   await this.blogModel.deleteMany({})
    // }

}
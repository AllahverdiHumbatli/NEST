import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { PostsOutputModelMapper, PostViewDto } from '../dto/postsDto';
import { Post } from '../schemas/post.schema';
import { FullPagination, PaginationOutput } from '../../../../common/pagination/paginationBase';


@Injectable()
export class PostsQueryRepository{
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}
  async getPostById(id: string): Promise<PostViewDto | null> {
    const result = await  this.postModel.findOne({_id: new ObjectId(id)})
    if(!result) {return null}


    return {
      id: result._id.toString(),
      title: result.title,
      shortDescription: result.shortDescription,
      content: result.content,
      blogId: result.blogId,
      blogName: result.blogName,
      createdAt: result.createdAt.toISOString(),
      // @ts-ignore
      extendedLikesInfo:  {
        dislikesCount: 0 ,
        likesCount: 0 ,
        myStatus: 'None',
        newestLikes: [],
         }
    }
  }
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string


  async getAll(pagination: FullPagination, blogId?: string): Promise<PaginationOutput<PostViewDto>>{
    const filter: FilterQuery<Post> = {};
    if(blogId){
      filter.blogId = blogId;
    }
    return this.getPaginationResult(pagination, filter)
  }
  async getPaginationResult(pagination: FullPagination, filter:FilterQuery<Post>): Promise<PaginationOutput<PostViewDto>>{
    const posts = await this.postModel
      .find(filter)
      .sort({[pagination.sortBy]: pagination.getSortDirectionInNumericFormat()})
      .skip(pagination.getSkipItemsCount())
      .limit(pagination.pageSize)

    const totalCount = await this.postModel.countDocuments(filter);
    const mappedPosts:PostViewDto[] = posts.map(this.postOutputMapper)
    //МОЖЕТ ПЕРЕНЕСТИ МАПЕР В ДРУГОЕ МЕСТО
      return  new PaginationOutput<PostViewDto>(mappedPosts, pagination.pageNumber, pagination.pageSize, totalCount)
  }

  private postOutputMapper(post:Post):PostViewDto{
    return {
      id : post._id.toString(),
      title : post.title,
      shortDescription : post.shortDescription,
      content : post.content,
      blogId : post.blogId,
      blogName : post.blogName,
      createdAt : post.createdAt.toISOString(),
      //@ts-ignore
      extendedLikesInfo : {
        dislikesCount: 0,
        likesCount: 0 ,
        myStatus: 'None',
        newestLikes: []
      }
    }
  }
}

import { Post } from '../schemas/post.schema';

export type CreateOrUpdatePostInputDto = {
  title: String,
  shortDescription: String,
  content: String,
  blogId: String
}
export type CreatePostByBlogIdFromUriParams = {
  title: String,
  shortDescription: String,
  content: String,
  blogId?: String
}

export class PostViewDto {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string
}
export type DataForCreatingPost = {
  title: String,
  shortDescription: String,
  content: String,
  blogId: String,
  blogName: String,

};

export const PostsOutputModelMapper = (post:Post)  => {
  const postViewDto: PostViewDto = new PostViewDto();

  postViewDto.id = post._id.toString()
  postViewDto.title = post.title;
  postViewDto.shortDescription = post.shortDescription;
  postViewDto.content = post.content
  postViewDto.blogId = post.blogId;
  postViewDto.blogName = post.blogName;
  postViewDto.createdAt = post.createdAt.toISOString();
  // @ts-ignore
  postViewDto.extendedLikesInfo = {
    dislikesCount: 0,
    likesCount: 0 ,
    myStatus: 'None',
    newestLikes: []
  }

  return postViewDto
}
// id: string;
// title: string;
// shortDescription: string;
// content: string;
// blogId: string;
// blogName: string;
// createdAt: string

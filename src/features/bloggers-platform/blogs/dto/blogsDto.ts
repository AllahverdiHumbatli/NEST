import {Blog} from "../schemas/blog.schema";

export type CreateOrUpdateBlogInputDto = {
    name: String,
    description: String,
    websiteUrl: String
}

export class BlogViewDto {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}

export type DataForCreatingBlog = {
    name: String,
    description: String,
    websiteUrl: String,
    isMembership: boolean,
};

export const BlogsOutputModelMapper = (blog:Blog)  => {
    const blogViewDto: BlogViewDto = new BlogViewDto();

    blogViewDto.id = blog._id.toString()
    blogViewDto.name = blog.name;
    blogViewDto.description = blog.description;
    blogViewDto.websiteUrl = blog.websiteUrl
    blogViewDto.createdAt = blog.createdAt.toISOString();
    blogViewDto.isMembership = blog.isMembership;

    return blogViewDto

}



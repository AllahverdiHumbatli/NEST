import {SortingPropertiesType} from "./types/sortingPropertiesType";
import {BlogViewDto} from "../features/blogs/dto/blogsDto";

export const BLOGS_SORTING_PROPERTIES: SortingPropertiesType<BlogViewDto> = ["name"];
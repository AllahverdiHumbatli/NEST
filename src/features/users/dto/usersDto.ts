import { Blog } from '../../bloggers-platform/blogs/schemas/blog.schema';
import { User } from '../schemas/user.schema';
import { IsAlpha, IsEmail, Length } from 'class-validator';


export class CreateUserInputDto  {
  @Length(5, 10)
  login: string
  password: string
  @IsEmail({}, {message: "Incorrect email"})
  @Length(5, 10)
  email: string
}

export class UserViewDto {
  id: string
  login: string
  email: string
  createdAt: string;
}


export const UsersOutputModelMapper = (user:User)  => {
  const userViewDto: UserViewDto = new UserViewDto();

  userViewDto.id = user._id.toString()
  userViewDto.login = user.login;
  userViewDto.email = user.email;
  userViewDto.createdAt = user.createdAt.toISOString()


  return userViewDto

}
//
//

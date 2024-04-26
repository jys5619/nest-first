import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async registerUser(newUser: UserDto): Promise<UserDto> {
    const userFind = await this.userService.findByField({
      where: {
        username: newUser.username,
      },
    });
    if (userFind) {
      throw new HttpException('username aleay userd!', HttpStatus.BAD_REQUEST);
    }

    return await this.userService.save(newUser);
  }

  async validateUser(userDto: UserDto): Promise<UserDto | undefined> {
    const userFind = await this.userService.findByField({
      where: {
        username: userDto.username,
      },
    });
    if (!userFind || userFind.password !== userDto.password) {
      throw new UnauthorizedException();
    }
    return userFind;
  }
}

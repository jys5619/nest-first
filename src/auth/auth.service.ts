import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  async validateUser(userDto: UserDto): Promise<{ access_token: string }> {
    const userFind = await this.userService.findByField({
      where: {
        username: userDto.username,
      },
    });
    if (!userFind) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(userDto.password, userFind.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload: Payload = { id: userFind.id, username: userFind.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

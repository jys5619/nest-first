import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerAccount(@Body() newUser: UserDto): Promise<UserDto> {
    return await this.authService.registerUser(newUser);
  }

  @Post('/login')
  async login(@Body() userDto: UserDto): Promise<{ access_token: string }> {
    return await this.authService.validateUser(userDto);
  }
}

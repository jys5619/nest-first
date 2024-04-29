import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthGuard } from './security/auth.guard';

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

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req) {
    console.log('Controller', req.user);
  }
}

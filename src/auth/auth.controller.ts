import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RoleType } from './role-type';
import { Request } from 'express';

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

  @Get('/admin-role')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRoleCheck(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/user-role')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  userRoleCheck(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}

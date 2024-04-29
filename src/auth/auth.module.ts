import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './security/jwt-contants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/jwt-strategy';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule,
  ],
  exports: [TypeOrmExModule, JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}

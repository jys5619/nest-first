import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  exports: [TypeOrmExModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}

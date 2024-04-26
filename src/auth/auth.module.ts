import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  exports: [TypeOrmExModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}

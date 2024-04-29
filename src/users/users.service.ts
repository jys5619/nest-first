import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { FindOneOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findByField(option: FindOneOptions<UserDto | undefined>) {
    return await this.userRepository.findOne(option);
  }

  async save(userDto: UserDto): Promise<UserDto | undefined> {
    await this.transformPassword(userDto);
    console.log(userDto);
    return await this.userRepository.save(userDto);
  }

  async transformPassword(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);
  }
}

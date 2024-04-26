import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { FindOneOptions } from 'typeorm';

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
    return await this.userRepository.save(userDto);
  }
}

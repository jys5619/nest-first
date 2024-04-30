import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Cat } from '../domain/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catsRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsRepository.save(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: string): Promise<Cat> {
    const findCat = await this.catsRepository.findOne({ where: { id: id } });
    if (!findCat) {
      throw new NotFoundException();
    }
    return findCat;
  }

  async patch(id: string, updateCatDto: UpdateCatDto): Promise<UpdateResult> {
    return await this.catsRepository.update(id, updateCatDto);
  }

  async update(updateCatDto: UpdateCatDto): Promise<UpdateResult> {
    const findCat = await this.findOne(updateCatDto.id);
    console.log(updateCatDto, findCat);
    if (findCat) {
      return await this.catsRepository
        .createQueryBuilder()
        .update(Cat)
        .set({
          name: updateCatDto.name,
          age: updateCatDto.age,
          breed: updateCatDto.breed,
        })
        .where('id = :id', { id: updateCatDto.id })
        .execute();
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.catsRepository.delete(id);
  }
}

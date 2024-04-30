import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from '../domain/cat.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return await this.catsService.findOne(id);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<UpdateResult> {
    return await this.catsService.patch(id, updateCatDto);
  }

  @Put()
  async update(@Body() updateCatDto: UpdateCatDto) {
    return await this.catsService.update(updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.catsService.remove(id);
  }
}

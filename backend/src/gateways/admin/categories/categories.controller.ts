import {
  Controller,
  Get,
  Delete,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { CategoriesPublicService } from 'src/domains/categories/public.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';

@Controller(`${AD}/categories`)
export class CategoriesController {
  constructor(
    private readonly categoriesPublicService: CategoriesPublicService,
  ) {}

  @Get('')
  async findAll() {
    return this.categoriesPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesPublicService.findOneById(id);
  }

  @Delete('')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesPublicService.delete(id);
  }

  @Post('')
  async create(@Body() body: CreateCategoryDto) {
    return this.categoriesPublicService.create(body);
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriesPublicService.update(id, body);
  }
}

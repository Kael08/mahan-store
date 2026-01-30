import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FE } from '../front.const';
import { CategoriesPublicService } from 'src/domains/categories/public.service';

@Controller(`${FE}/categories`)
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
}

import { Controller, Get, ParseIntPipe, Param } from '@nestjs/common';
import { FE } from '../front.const';
import { BrandsPublicService } from 'src/domains/brands/public.service';

@Controller(`${FE}/brands`)
export class BrandsController {
  constructor(private readonly brandsPublicService: BrandsPublicService) {}

  @Get('')
  async findAll() {
    return this.brandsPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.findOneById(id);
  }
}

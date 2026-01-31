import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FE } from '../front.const';
import { ProductImagesPublicService } from 'src/domains/productImages/public.service';

@Controller(`${FE}/productImages`)
export class ProductImagesController {
  constructor(
    private readonly productImagesPublicService: ProductImagesPublicService,
  ) {}

  @Get('')
  async findAll() {
    return this.productImagesPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.findOneById(id);
  }
}

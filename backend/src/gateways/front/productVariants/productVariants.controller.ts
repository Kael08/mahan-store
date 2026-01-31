import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FE } from '../front.const';
import { ProductVariantsPublicService } from 'src/domains/productVariants/public.service';

@Controller(`${FE}/productVariants`)
export class ProductVariantsController {
  constructor(
    private readonly productVariantsPublicService: ProductVariantsPublicService,
  ) {}

  @Get('')
  async findAll() {
    return this.productVariantsPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.productVariantsPublicService.findOneById(id);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FE } from '../front.const';
import { ProductLinksPublicService } from 'src/domains/productLinks/public.service';

@Controller(`${FE}/productLinks`)
export class ProductLinksController {
  constructor(
    private readonly productLinksPublicService: ProductLinksPublicService,
  ) {}

  @Get('')
  async findAll() {
    return this.productLinksPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.productLinksPublicService.findOneById(id);
  }
}

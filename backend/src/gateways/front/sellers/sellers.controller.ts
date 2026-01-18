import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { FE } from '../front.const';
import { SellersPublicService } from 'src/domains/sellers/public.service';

@Controller(`${FE}/sellers`)
export class SellersController {
  constructor(private readonly sellersPublicService: SellersPublicService) {}

  @Get('')
  async findAll() {
    return this.sellersPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.sellersPublicService.findOneById(id);
  }
}

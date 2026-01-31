import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductLinksPublicService } from 'src/domains/productLinks/public.service';
import { CreateProductLinkDto } from './dto/CreateProductLinkDto';

@Controller(`${AD}/productLinks`)
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

  @Post('')
  async create(@Body() body: CreateProductLinkDto) {
    return this.productLinksPublicService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productLinksPublicService.delete(id);
  }
}

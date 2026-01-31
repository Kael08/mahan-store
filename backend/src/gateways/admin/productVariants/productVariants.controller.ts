import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductVariantsPublicService } from 'src/domains/productVariants/public.service';
import { CreateProductVariantDto } from './dto/CreateProductVariantDto';
import { UpdateProductVariantDto } from './dto/UpdateProductVariantDto';

@Controller(`${AD}/productVariants`)
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

  @Post('')
  async create(@Body() body: CreateProductVariantDto) {
    return this.productVariantsPublicService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductVariantDto,
  ) {
    return this.productVariantsPublicService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productVariantsPublicService.delete(id);
  }
}

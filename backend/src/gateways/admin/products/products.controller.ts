import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductsPublicService } from 'src/domains/products/public.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateProductDto } from './dto/UpdateProductDto';
import { TProducts } from 'src/domains/products/public.types';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(`${AD}/products`)
export class ProductsController {
  constructor(private readonly productsPublicService: ProductsPublicService) {}

  @Get('')
  async findAll(): Promise<TProducts[]> {
    return await this.productsPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<TProducts> {
    return await this.productsPublicService.findOneById(id);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<TProducts> {
    return this.productsPublicService.create({...createDto, image});
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<TProducts> {
    return this.productsPublicService.update(
      id, {
        ...updateDto,
        image
      }
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsPublicService.delete(id);
  }
}

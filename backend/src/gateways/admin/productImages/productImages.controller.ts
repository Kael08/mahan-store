import {
  Controller,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Delete,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AD } from '../admin.const';
import { ProductImagesPublicService } from 'src/domains/productImages/public.service';
import { CreateProductImageDto } from './dto/CreateProductImageDto';

@Controller(`${AD}/productImages`)
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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productImagesPublicService.delete(id);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateProductImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productImagesPublicService.create({ ...body, image });
  }
}

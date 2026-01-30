import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  ParseIntPipe,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AD } from '../admin.const';
import { BrandsPublicService } from 'src/domains/brands/public.service';
import { UpdateBrandDto } from './dto/UpdateBrandDto';
import { CreateBrandDto } from './dto/CreateBrandDto';

@Controller(`${AD}/brands`)
export class BrandsController {
  constructor(private readonly brandsPublicService: BrandsPublicService) {}

  @Get('')
  async findAll() {
    return this.brandsPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.brandsPublicService.findOneById(id);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateBrandDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.brandsPublicService.create({ ...body, image });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBrandDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.brandsPublicService.update(id, { ...body, image });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.brandsPublicService.delete(id);

    return {
      message: `The brand with the ID ${id} has been successfully deleted`,
    };
  }
}

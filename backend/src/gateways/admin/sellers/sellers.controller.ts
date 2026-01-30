import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { SellersPublicService } from 'src/domains/sellers/public.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSellerDto } from './dto/createSellerDto';
import { UpdateSellerDto } from './dto/updateSellerDto';

@Controller(`${AD}/sellers`)
export class SellersController {
  constructor(private readonly sellersPublicService: SellersPublicService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateSellerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.sellersPublicService.create({ ...body, image });
  }

  @Get('')
  async findAll() {
    return this.sellersPublicService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.sellersPublicService.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSellerDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.sellersPublicService.update(id, { ...body, image });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.sellersPublicService.delete(id);
  }
}

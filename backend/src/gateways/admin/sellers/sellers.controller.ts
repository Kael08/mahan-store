import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { SellersPublicService } from 'src/domains/sellers/public.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSellerDto } from './dto/createSellerDto';

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
}

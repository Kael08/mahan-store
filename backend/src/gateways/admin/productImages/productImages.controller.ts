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
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AD } from '../admin.const';
import { ProductImagesPublicService } from 'src/domains/productImages/public.service';
import { CreateProductImageDto } from './dto/CreateProductImageDto';
import { JwtAuthGuard } from 'src/domains/auth/infrastructure/jwt-auth.guard';
import { CurrentUser } from 'src/domains/auth/infrastructure/current-user.decorator';
import { ProductsPublicService } from 'src/domains/products/public.service';

@Controller(`${AD}/productImages`)
@UseGuards(JwtAuthGuard)
export class ProductImagesController {
  constructor(
    private readonly productImagesPublicService: ProductImagesPublicService,
    private readonly productsPublicService: ProductsPublicService,
  ) {}

  @Get('')
  async findAll(@CurrentUser() user: { id: number }) {
    const images = await this.productImagesPublicService.findAll();
    // Фильтруем изображения по товарам текущего пользователя
    const userProducts = await this.productsPublicService.findAll();
    const userProductIds = userProducts
      .filter((p) => p.seller?.id === user.id)
      .map((p) => p.id);
    return images.filter((img) => userProductIds.includes(img.productId));
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ) {
    const image = await this.productImagesPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      image.productId,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому изображению');
    }
    return image;
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ) {
    const image = await this.productImagesPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      image.productId,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому изображению');
    }
    return this.productImagesPublicService.delete(id);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateProductImageDto,
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() user: { id: number },
  ) {
    // Проверяем, что товар принадлежит текущему пользователю
    const product = await this.productsPublicService.findOneById(
      body.productId,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому товару');
    }
    return this.productImagesPublicService.create({ ...body, image });
  }
}

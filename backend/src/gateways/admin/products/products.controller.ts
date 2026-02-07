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
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductsPublicService } from 'src/domains/products/public.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateProductDto } from './dto/UpdateProductDto';
import { TProduct } from 'src/domains/products/public.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/domains/auth/infrastructure/jwt-auth.guard';
import { CurrentUser } from 'src/domains/auth/infrastructure/current-user.decorator';

@Controller(`${AD}/products`)
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsPublicService: ProductsPublicService) {}

  @Get('')
  async findAll(@CurrentUser() user: { id: number }): Promise<TProduct[]> {
    // Фильтруем товары по sellerId текущего пользователя
    const products = await this.productsPublicService.findAll();
    return products.filter((p) => p.seller?.id === user.id);
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ): Promise<TProduct> {
    const product = await this.productsPublicService.findOneById(id);

    // Проверяем, что товар принадлежит текущему пользователю
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому товару');
    }

    return product;
  }

  @Post('')
  async create(
    @Body() body: CreateProductDto,
    @CurrentUser() user: { id: number },
  ): Promise<TProduct> {
    // Устанавливаем sellerId из токена
    body.sellerId = user.id;
    return this.productsPublicService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
    @CurrentUser() user: { id: number },
  ): Promise<TProduct> {
    // Проверяем, что товар принадлежит текущему пользователю
    const product = await this.productsPublicService.findOneById(id);
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому товару');
    }

    // Устанавливаем sellerId из токена (на случай, если кто-то попытается изменить)
    body.sellerId = user.id;
    return this.productsPublicService.update(id, body);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ): Promise<void> {
    // Проверяем, что товар принадлежит текущему пользователю
    const product = await this.productsPublicService.findOneById(id);
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому товару');
    }

    return this.productsPublicService.delete(id);
  }
}

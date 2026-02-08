import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductVariantsPublicService } from 'src/domains/productVariants/public.service';
import { CreateProductVariantDto } from './dto/CreateProductVariantDto';
import { UpdateProductVariantDto } from './dto/UpdateProductVariantDto';
import { JwtAuthGuard } from 'src/domains/auth/infrastructure/jwt-auth.guard';
import { CurrentUser } from 'src/domains/auth/infrastructure/current-user.decorator';
import { ProductsPublicService } from 'src/domains/products/public.service';

@Controller(`${AD}/productVariants`)
@UseGuards(JwtAuthGuard)
export class ProductVariantsController {
  constructor(
    private readonly productVariantsPublicService: ProductVariantsPublicService,
    private readonly productsPublicService: ProductsPublicService,
  ) {}

  @Get('')
  async findAll(@CurrentUser() user: { id: number }) {
    const variants = await this.productVariantsPublicService.findAll();
    // Фильтруем варианты по товарам текущего пользователя
    const userProducts = await this.productsPublicService.findAll();
    const userProductIds = userProducts
      .filter((p) => p.seller?.id === user.id)
      .map((p) => p.id);
    return variants.filter((v) => userProductIds.includes(v.product.id));
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ) {
    const variant = await this.productVariantsPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      variant.product.id,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому варианту');
    }
    return variant;
  }

  @Post('')
  async create(
    @Body() body: CreateProductVariantDto,
    @CurrentUser() user: { id: number },
  ) {
    // Проверяем, что товар принадлежит текущему пользователю
    const product = await this.productsPublicService.findOneById(
      body.productId,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому товару');
    }
    return this.productVariantsPublicService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductVariantDto,
    @CurrentUser() user: { id: number },
  ) {
    const variant = await this.productVariantsPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      variant.product.id,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому варианту');
    }
    return this.productVariantsPublicService.update(id, body);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ) {
    const variant = await this.productVariantsPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      variant.product.id,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому варианту');
    }
    await this.productVariantsPublicService.delete(id);

    return {
      success: true,
      message: 'Вариант товара успешно удален',
    };
  }
}

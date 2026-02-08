import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  ParseIntPipe,
  Post,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductLinksPublicService } from 'src/domains/productLinks/public.service';
import { CreateProductLinkDto } from './dto/CreateProductLinkDto';
import { JwtAuthGuard } from 'src/domains/auth/infrastructure/jwt-auth.guard';
import { CurrentUser } from 'src/domains/auth/infrastructure/current-user.decorator';
import { ProductsPublicService } from 'src/domains/products/public.service';

@Controller(`${AD}/productLinks`)
@UseGuards(JwtAuthGuard)
export class ProductLinksController {
  constructor(
    private readonly productLinksPublicService: ProductLinksPublicService,
    private readonly productsPublicService: ProductsPublicService,
  ) {}

  @Get('')
  async findAll(@CurrentUser() user: { id: number }) {
    const links = await this.productLinksPublicService.findAll();
    const userProducts = await this.productsPublicService.findAll();
    const userProductIds = userProducts
      .filter((p) => p.seller?.id === user.id)
      .map((p) => p.id);
    return links.filter((link) => userProductIds.includes(link.product.id));
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ) {
    const link = await this.productLinksPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      link.product.id,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этой ссылке');
    }
    return link;
  }

  @Post('')
  async create(
    @Body() body: CreateProductLinkDto,
    @CurrentUser() user: { id: number },
  ) {
    const product = await this.productsPublicService.findOneById(
      body.productId,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этому товару');
    }
    return this.productLinksPublicService.create(body);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: number },
  ) {
    const link = await this.productLinksPublicService.findOneById(id);
    const product = await this.productsPublicService.findOneById(
      link.product.id,
    );
    if (product.seller?.id !== user.id) {
      throw new ForbiddenException('Нет доступа к этой ссылке');
    }
    await this.productLinksPublicService.delete(id);

    return {
      success: true,
      message: 'Ссылка успешно удалена',
    };
  }
}

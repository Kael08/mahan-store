import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantEntity } from './entities/productVariants.entity';
import {
  TCreateProductVariant,
  TProductVariant,
  TUpdateProductVariant,
} from '../public.types';
import { ProductsPublicService } from 'src/domains/products/public.service';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private readonly repo: Repository<ProductVariantEntity>,
    private readonly productsPublicService: ProductsPublicService,
  ) {}

  async findAll(): Promise<TProductVariant[]> {
    return this.repo.find({
      relations: ['product'],
    });
  }

  async findOneById(id: number): Promise<TProductVariant> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: ['product'],
    });
  }

  async create(data: TCreateProductVariant): Promise<TProductVariant> {
    const product = await this.productsPublicService.findOneById(
      data.productId,
    );

    if (!product) {
      throw new NotFoundException(`Продукт с id ${data.productId} не найден`);
    }

    delete (data as any).productId;

    const productVariant = this.repo.create({ ...data, product });

    return this.repo.save(productVariant);
  }

  async update(
    id: number,
    data: TUpdateProductVariant,
  ): Promise<TProductVariant> {
    const product = await this.productsPublicService.findOneById(
      data.productId,
    );

    if (!product) {
      throw new NotFoundException(`Продукт с id ${data.productId} не найден`);
    }

    delete (data as any).productId;

    await this.repo.update(id, { ...data, product });

    return this.repo.findOneOrFail({
      where: { id },
      relations: ['product'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

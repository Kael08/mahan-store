import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLinkEntity } from './entities/productLinks.entity';
import { TCreateProductLink, TProductLink } from '../public.types';
import { TProduct } from 'src/domains/products/public.types';
import { ProductsPublicService } from 'src/domains/products/public.service';

@Injectable()
export class ProductLinksService {
  constructor(
    @InjectRepository(ProductLinkEntity)
    private readonly repo: Repository<ProductLinkEntity>,
    private readonly prodcutsPublicService: ProductsPublicService,
  ) {}

  async findAll(): Promise<TProductLink[]> {
    return this.repo.find({
      relations: ['product'],
    });
  }

  async findOneById(id: number): Promise<TProductLink> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: ['product'],
    });
  }

  async create(data: TCreateProductLink): Promise<TProductLink> {
    const product = await this.prodcutsPublicService.findOneById(
      data.productId,
    );
    if (!product) {
      throw new NotFoundException(`Продукт с id ${data.productId} не найден`);
    }

    delete (data as any).productId;

    const productLink = this.repo.create({ ...data, product });

    return this.repo.save(productLink);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

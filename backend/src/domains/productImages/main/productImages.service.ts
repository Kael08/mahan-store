import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageEntity } from './entities/productImages.entity';
import { TCreateProductImage } from '../public.types';
import { TProductImage } from '../public.types';
import { TProduct } from 'src/domains/products/public.types';
import { ProductsPublicService } from 'src/domains/products/public.service';
import { S3Service } from 'src/common/s3/s3.service';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly repo: Repository<ProductImageEntity>,
    private readonly productPublicService: ProductsPublicService,
    private readonly s3Service: S3Service,
  ) {}

  async findAll(): Promise<TProductImage[]> {
    return this.repo.find({
      relations: ['product'],
    });
  }

  async findOneById(id: number): Promise<TProductImage> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: ['product'],
    });
  }

  async create(data: TCreateProductImage): Promise<TProductImage> {
    // Связка с продуктов
    let product: TProduct | undefined;

    const productExists = await this.productPublicService.findOneById(
      data.productId,
    );
    if (!productExists) {
      throw new NotFoundException(`Продукт с id ${data.productId} не найден`);
    }

    product = productExists;

    delete (data as any).productId;

    // Сохранение картинки
    let imageUrl: string | undefined;

    imageUrl = await this.s3Service.uploadFile(
      data.image,
      `productImages/${Date.now()}-${product.title}`,
    );

    delete (data as any).image;

    const productImage = this.repo.create({ ...data, product, imageUrl });

    return this.repo.save(productImage);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async changeMainImage(imageId: number, productId: number): Promise<void> {
    await this.repo.update({ product: { id: productId } }, { isMain: false });

    await this.repo.update(imageId, { isMain: true });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { TProduct, TCreateProduct } from '../public.types';
import { Repository } from 'typeorm';
import { S3Service } from 'src/common/s3/s3.service';
import { TSeller } from 'src/domains/sellers/public.types';
import { TBrand } from 'src/domains/brands/public.types';
import { TCategory } from 'src/domains/categories/public.types';
import { SellersPublicService } from 'src/domains/sellers/public.service';
import { BrandsPublicService } from 'src/domains/brands/public.service';
import { CategoriesPublicService } from 'src/domains/categories/public.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repo: Repository<ProductEntity>,
    private readonly s3Service: S3Service,
    private readonly sellersPublicService: SellersPublicService,
    private readonly brandsPublicService: BrandsPublicService,
    private readonly categoriesPublicService: CategoriesPublicService,
  ) {}

  async findAll(): Promise<TProduct[]> {
    return this.repo.find({
      relations: ['seller', 'category', 'brand'],
    });
  }

  async findOneById(id: number): Promise<TProduct> {
    return this.repo.findOneOrFail({
      where: { id },
      relations: ['seller', 'category', 'brand'],
    });
  }

  async create(data: TCreateProduct): Promise<TProduct> {
    let seller: TSeller | undefined;
    let brand: TBrand | undefined;
    let category: TCategory | undefined;

    if (data.brandId && data.sellerId && data.categoryId) {
      const brandExists = await this.brandsPublicService.findOneById(
        data.brandId,
      );
      if (!brandExists) {
        throw new NotFoundException(`Бренд с id ${data.brandId} не найден`);
      }

      const sellerExists = await this.sellersPublicService.findOneById(
        data.sellerId,
      );
      if (!sellerExists) {
        throw new NotFoundException(`Продавец с id ${data.sellerId} не найден`);
      }

      const categoryExists = await this.categoriesPublicService.findOneById(
        data.categoryId,
      );
      if (!categoryExists) {
        throw new NotFoundException(
          `Категория с id ${data.categoryId} не найдена`,
        );
      }

      brand = brandExists;
      seller = sellerExists;
      category = categoryExists;
    }

    delete (data as any).brandId;
    delete (data as any).sellerId;
    delete (data as any).categoryId;

    const product = this.repo.create({ ...data, brand, seller, category });

    return this.repo.save(product);
  }

  // async update(id: number, data: TUpdateProduct): Promise<TProducts> {
  //   let imageUrl: string | undefined;

  //   if (data.image) {
  //     imageUrl = await this.s3Service.uploadFile(data.image);
  //     delete (data as any).image;

  //     const oldProduct = await this.repo.findOneBy({ id });
  //     if (oldProduct?.imageUrl) {
  //       const oldKey = oldProduct.imageUrl.split('/').slice(-1)[0];
  //       await this.s3Service.deleteFile(oldKey);
  //     }
  //   }

  //   await this.repo.update(id, { ...data, imageUrl });
  //   return this.repo.findOneByOrFail({ id });
  // }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

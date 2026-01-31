import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './main/entities/product.entity';
import { ProductsService } from './main/products.service';
import { ProductsPublicService } from './public.service';
import { S3Module } from 'src/common/s3/s3.module';
import { CategoriesModule } from '../categories/categories.module';
import { BrandsModule } from '../brands/brands.module';
import { SellersModule } from '../sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    S3Module,
    CategoriesModule,
    BrandsModule,
    SellersModule,
  ],
  providers: [ProductsService, ProductsPublicService],
  exports: [ProductsPublicService],
})
export class ProductsModule {}

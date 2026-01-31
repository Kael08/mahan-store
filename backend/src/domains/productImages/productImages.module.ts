import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageEntity } from './main/entities/productImages.entity';
import { ProductImagesPublicService } from './public.service';
import { ProductImagesService } from './main/productImages.service';
import { ProductsModule } from '../products/products.module';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImageEntity]),
    ProductsModule,
    S3Module,
  ],
  providers: [ProductImagesPublicService, ProductImagesService],
  exports: [ProductImagesPublicService],
})
export class ProductImagesModule {}

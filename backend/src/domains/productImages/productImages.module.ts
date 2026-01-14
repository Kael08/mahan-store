import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageEntity } from './main/entities/productImages.entity';
import { ProductImagesPublicService } from './public.service';
import { ProductImagesService } from './main/productImages.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImageEntity])],
  providers: [ProductImagesPublicService, ProductImagesService],
  exports: [ProductImagesPublicService],
})
export class ProductImagesModule {}

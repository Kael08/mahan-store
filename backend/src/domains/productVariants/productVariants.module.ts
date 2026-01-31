import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantEntity } from './main/entities/productVariants.entity';
import { ProductVariantsService } from './main/productVariants.service';
import { ProductVariantsPublicService } from './public.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantEntity]), ProductsModule],
  providers: [ProductVariantsPublicService, ProductVariantsService],
  exports: [ProductVariantsPublicService],
})
export class ProductVariantsModule {}

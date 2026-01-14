import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantEntity } from './main/entities/productVariants.entity';
import { ProductVariantsService } from './main/productVariants.service';
import { ProductVariantsPublicService } from './public.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariantEntity])],
  providers: [ProductVariantsPublicService, ProductVariantsService],
  exports: [ProductVariantsPublicService],
})
export class ProductVariantsModule {}

import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/domains/products/products.module';
import { ProductsController } from './products/products.controller';
import { BrandsModule } from 'src/domains/brands/brands.module';
import { BrandsController } from './brands/brands.controller';
import { CategoriesModule } from 'src/domains/categories/categories.module';
import { CategoriesController } from './categories/categories.controller';
import { ProductImagesModule } from 'src/domains/productImages/productImages.module';
import { ProductImagesController } from './productImages/productImages.controller';
import { ProductLinksModule } from 'src/domains/productLinks/productLinks.module';
import { ProductLinksController } from './productLinks/productLinks.controller';
import { ProductVariantsModule } from 'src/domains/productVariants/productVariants.module';
import { ProductVariantsController } from './productVariants/productVariants.controller';
import { SellersModule } from 'src/domains/sellers/sellers.module';
import { SellersController } from './sellers/sellers.controller';
import { AuthModule } from 'src/domains/auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    ProductImagesModule,
    ProductLinksModule,
    ProductVariantsModule,
    SellersModule,
    AuthModule,
  ],
  controllers: [
    ProductsController,
    BrandsController,
    CategoriesController,
    ProductImagesController,
    ProductImagesController,
    ProductLinksController,
    ProductVariantsController,
    SellersController,
    AuthController,
  ],
})
export class AdminGatewayModule {}

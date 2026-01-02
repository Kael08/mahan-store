import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './main/entities/products.entity';
import { ProductsService } from './main/products.service';
import { ProductsPublicService } from './public.service';
import { S3Module } from 'src/common/s3/s3.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    S3Module,
  ],
  providers: [ProductsService, ProductsPublicService],
  exports: [ProductsPublicService],
})
export class ProductsModule {}

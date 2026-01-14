import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './main/entities/brands.entity';
import { BrandsService } from './main/brands.service';
import { BrandsPublicService } from './public.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandsService, BrandsPublicService],
  exports: [BrandsPublicService],
})
export class BrandsModule {}

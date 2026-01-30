import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './main/entities/brands.entity';
import { BrandsService } from './main/brands.service';
import { BrandsPublicService } from './public.service';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity]), S3Module],
  providers: [BrandsService, BrandsPublicService],
  exports: [BrandsPublicService],
})
export class BrandsModule {}

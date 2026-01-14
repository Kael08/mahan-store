import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from './main/entities/seller.entity';
import { SellersService } from './main/sellers.service';
import { SellersPublicService } from './public.service';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity]), S3Module],
  providers: [SellersPublicService, SellersService],
  exports: [SellersPublicService],
})
export class SellersModule {}

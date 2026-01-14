import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from './main/entities/sellers.entity';
import { SellersService } from './main/sellers.service';
import { SellersPublicService } from './public.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity])],
  providers: [SellersPublicService, SellersService],
  exports: [SellersPublicService],
})
export class SellersModule {}

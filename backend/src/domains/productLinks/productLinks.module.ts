import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLinkEntity } from './main/entities/productLinks.entity';
import { ProductLinksService } from './main/productLinks.service';
import { ProductLinksPublicService } from './public.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductLinkEntity])],
  providers: [ProductLinksService, ProductLinksPublicService],
  exports: [ProductLinksPublicService],
})
export class ProductLinksModule {}

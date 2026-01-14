import { Module } from '@nestjs/common';
import { CategoriesPublicService } from './public.service';
import { CategoriesService } from './main/categories.service';
import { CategoryEntity } from './main/entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoriesService, CategoriesPublicService],
  exports: [CategoriesPublicService],
})
export class CategoriesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageEntity } from './entities/productImages.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly repo: Repository<ProductImageEntity>,
  ) {}
}

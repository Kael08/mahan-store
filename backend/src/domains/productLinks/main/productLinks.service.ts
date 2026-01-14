import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLinkEntity } from './entities/productLinks.entity';

@Injectable()
export class ProductLinksService {
  constructor(
    @InjectRepository(ProductLinkEntity)
    private readonly repo: Repository<ProductLinkEntity>,
  ) {}
}

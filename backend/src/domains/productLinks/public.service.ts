import { Injectable } from '@nestjs/common';
import { ProductLinksService } from './main/productLinks.service';

@Injectable()
export class ProductLinksPublicService {
  constructor(private readonly service: ProductLinksService) {}
}

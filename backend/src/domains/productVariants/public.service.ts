import { Injectable } from '@nestjs/common';
import { ProductVariantsService } from './main/productVariants.service';

@Injectable()
export class ProductVariantsPublicService {
  constructor(private readonly service: ProductVariantsService) {}
}

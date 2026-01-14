import { Injectable } from '@nestjs/common';
import { ProductImagesService } from './main/productImages.service';

@Injectable()
export class ProductImagesPublicService {
  constructor(private readonly service: ProductImagesService) {}
}

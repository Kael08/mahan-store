import { Controller } from '@nestjs/common';
import { FE } from '../front.const';
import { ProductImagesPublicService } from 'src/domains/productImages/public.service';

@Controller(`${FE}/productImages`)
export class ProductImagesController {
  constructor(
    private readonly productImagesPublicService: ProductImagesPublicService,
  ) {}
}

import { Controller } from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductImagesPublicService } from 'src/domains/productImages/public.service';

@Controller(`${AD}/productImages`)
export class ProductImagesController {
  constructor(
    private readonly productImagesPublicService: ProductImagesPublicService,
  ) {}
}

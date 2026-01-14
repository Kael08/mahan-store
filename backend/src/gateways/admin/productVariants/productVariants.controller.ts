import { Controller } from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductVariantsPublicService } from 'src/domains/productVariants/public.service';

@Controller(`${AD}/productVariants`)
export class ProductVariantsController {
  constructor(
    private readonly ProductVariantsPublicService: ProductVariantsPublicService,
  ) {}
}

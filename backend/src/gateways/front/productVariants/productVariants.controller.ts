import { Controller } from '@nestjs/common';
import { FE } from '../front.const';
import { ProductVariantsPublicService } from 'src/domains/productVariants/public.service';

@Controller(`${FE}/productVariants`)
export class ProductVariantsController {
  constructor(
    private readonly ProductVariantsPublicService: ProductVariantsPublicService,
  ) {}
}

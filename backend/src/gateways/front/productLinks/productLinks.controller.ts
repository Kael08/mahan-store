import { Controller } from '@nestjs/common';
import { FE } from '../front.const';
import { ProductLinksPublicService } from 'src/domains/productLinks/public.service';

@Controller(`${FE}/productLinks`)
export class ProductLinksController {
  constructor(
    private readonly productLinksPublicService: ProductLinksController,
  ) {}
}

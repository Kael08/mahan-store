import { Controller } from '@nestjs/common';
import { AD } from '../admin.const';
import { ProductLinksPublicService } from 'src/domains/productLinks/public.service';

@Controller(`${AD}/productLinks`)
export class ProductLinksController {
  constructor(
    private readonly productLinksPublicService: ProductLinksPublicService,
  ) {}
}

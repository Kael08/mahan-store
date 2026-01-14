import { Controller } from '@nestjs/common';
import { FE } from '../front.const';
import { CategoriesPublicService } from 'src/domains/categories/public.service';

@Controller(`${FE}/categories`)
export class CategoriesController {
  constructor(
    private readonly categoriesPublicService: CategoriesPublicService,
  ) {}
}

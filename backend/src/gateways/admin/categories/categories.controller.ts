import { Controller } from '@nestjs/common';
import { AD } from '../admin.const';
import { CategoriesPublicService } from 'src/domains/categories/public.service';

@Controller(`${AD}/categories`)
export class CategoriesController {
  constructor(
    private readonly categoriesPublicService: CategoriesPublicService,
  ) {}
}

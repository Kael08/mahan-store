import { Controller } from '@nestjs/common';
import { AD } from '../admin.const';
import { BrandsPublicService } from 'src/domains/brands/public.service';

@Controller(`${AD}/brands`)
export class BrandsController {
  constructor(private readonly brandsPublicService: BrandsPublicService) {}
}

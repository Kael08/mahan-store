import { Controller } from '@nestjs/common';
import { FE } from '../front.const';
import { BrandsPublicService } from 'src/domains/brands/public.service';

@Controller(`${FE}/brands`)
export class BrandsController {
  constructor(private readonly brandsPublicService: BrandsPublicService) {}
}

import { Controller } from '@nestjs/common';
import { FE } from '../front.const';
import { SellersPublicService } from 'src/domains/sellers/public.service';

@Controller(`${FE}/sellers`)
export class SellersController {
  constructor(private readonly sellersPublicService: SellersPublicService) {}
}

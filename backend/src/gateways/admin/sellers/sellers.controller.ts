import { Controller } from '@nestjs/common';
import { AD } from '../admin.const';
import { SellersPublicService } from 'src/domains/sellers/public.service';

@Controller(`${AD}/sellers`)
export class SellersController {
  constructor(private readonly sellersPublicService: SellersPublicService) {}
}

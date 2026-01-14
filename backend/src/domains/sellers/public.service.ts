import { Injectable } from '@nestjs/common';
import { SellersService } from './main/sellers.service';

@Injectable()
export class SellersPublicService {
  constructor(private readonly service: SellersService) {}
}

import { Injectable } from '@nestjs/common';
import { BrandsService } from './main/brands.service';

@Injectable()
export class BrandsPublicService {
  constructor(private readonly service: BrandsService) {}
}

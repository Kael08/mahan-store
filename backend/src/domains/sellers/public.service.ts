import { Injectable } from '@nestjs/common';
import { SellersService } from './main/sellers.service';
import { TSeller, TCreateSeller } from './public.types';

@Injectable()
export class SellersPublicService {
  constructor(private readonly service: SellersService) {}

  async findAll(): Promise<TSeller[]> {
    return this.service.findAll();
  }

  async findOneById(id: number): Promise<TSeller> {
    return this.service.findOneById(id);
  }

  async create(data: TCreateSeller): Promise<TSeller> {
    return this.service.create(data);
  }
}

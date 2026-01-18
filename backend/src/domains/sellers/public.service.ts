import { Injectable } from '@nestjs/common';
import { SellersService } from './main/sellers.service';
import { TSeller, TCreateSeller, TUpdateSeller } from './public.types';

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

  async delete(id: number): Promise<void> {
    await this.service.delete(id);
  }

  async update(id: number, data: TUpdateSeller): Promise<TSeller> {
    return await this.service.update(id, data);
  }
}

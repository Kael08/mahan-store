import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerEntity } from './entities/sellers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly repo: Repository<SellerEntity>,
  ) {}
}

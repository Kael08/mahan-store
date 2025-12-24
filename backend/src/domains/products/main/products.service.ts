import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity'
import { TProducts, TCreateProducts, TUpdateProducts } from '../public.types'
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly repo: Repository<ProductsEntity>,
    ) {}

    async findAll(): Promise<TProducts[]>{
        return this.repo.find();
    }

    async findOneById(id: number): Promise<TProducts>{
        return this.repo.findOneByOrFail({id});
    }

    async create(data: TCreateProducts ): Promise<TProducts> {
        const product = this.repo.create(data);
        return this.repo.save(product)
    }

    async update(id: number, data: TUpdateProducts ): Promise<TProducts> {
        await this.repo.update(id, data);
        return this.repo.findOneByOrFail({id})
    }

    async delete(id: number ): Promise<void> {
        await this.repo.delete(id)
    }
}
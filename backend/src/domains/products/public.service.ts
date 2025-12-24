import { Injectable } from '@nestjs/common'
import { ProductsService } from './main/products.service'
import { TProducts, TCreateProducts, TUpdateProducts } from './public.types'

@Injectable()
export class ProductsPublicService {
    constructor(
        private readonly productsService: ProductsService,
    ){}

    async findAll(): Promise<TProducts[]>{
        return this.productsService.findAll()
    }

    async findOneById(id: number): Promise<TProducts> {
        return this.productsService.findOneById(id)
    }

    async create(data:TCreateProducts): Promise<TProducts>{
        return this.productsService.create(data)
    }

    async update(id: number, data: TUpdateProducts): Promise<TProducts> {
        return this.productsService.update(id,data)
    }

    async delete(id: number): Promise<void> {
        return this.productsService.delete(id)
    }
}
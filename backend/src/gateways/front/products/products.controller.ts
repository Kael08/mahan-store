import { Controller } from '@nestjs/common'
import { ProductsPublicService } from '../../../domains/products/public.service'
import { FE } from '../front.const'
import { Get, Param } from '@nestjs/common'
import { TProducts } from 'src/domains/products/public.types'

@Controller(`${FE}/products`)
export class ProductsController{
    constructor(
        private readonly productsPublicService: ProductsPublicService,
    ) {}

    @Get('/')
    async findAll(): Promise<TProducts[]>{
        return await this.productsPublicService.findAll()
    }

    @Get(':id')
    async findOneById(@Param('id') id: number):Promise<TProducts>{
        return await this.productsPublicService.findOneById(id)
    }
}
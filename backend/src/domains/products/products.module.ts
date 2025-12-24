import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './main/entities/products.entity';
import { ProductsService } from './main/products.service'
import { ProductsPublicService } from './public.service'

@Module({
    imports:[
        TypeOrmModule.forFeature([
            ProductsEntity,
        ])
    ],
    providers: [ProductsService, ProductsPublicService],
    exports: [ProductsPublicService],
})

export class ProductsModule {}
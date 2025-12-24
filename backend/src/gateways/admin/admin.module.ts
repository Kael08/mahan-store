import { Module } from '@nestjs/common'
import { ProductsModule } from 'src/domains/products/products.module'
import { ProductsController } from './products/products.controller'

@Module({
    imports: [
        ProductsModule,
    ],
    controllers:[
        ProductsController,
    ],
})
export class AdminGatewayModule{}
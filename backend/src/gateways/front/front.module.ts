import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/domains/products/products.module';
import { ProductsController } from 'src/gateways/front/products/products.controller';

@Module({
  imports: [ProductsModule],
  controllers: [ProductsController],
})
export class FrontGatewayModule {}

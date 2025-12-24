import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontGatewayModule } from './gateways/front/front.module'
import { AdminGatewayModule } from './gateways/admin/admin.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_POST'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // set to false in production
      }),
      
    }),
    FrontGatewayModule,
    AdminGatewayModule,
  ],
})
export class AppModule {}

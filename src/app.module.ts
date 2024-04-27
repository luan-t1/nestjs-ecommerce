import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';
import { config } from 'dotenv';
config();


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [Product, Category],
    database: process.env.DB_DB,
    synchronize: true
  }),
  ProductModule,
  CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

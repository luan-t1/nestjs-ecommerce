import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';
import { CategoryService } from '../categories/category.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), 
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
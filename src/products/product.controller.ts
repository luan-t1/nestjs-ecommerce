import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc', // Adicione a opção 'none' para consulta desordenada
  ): Promise<Product[]> {
    return this.productService.findAll(page, pageSize, sort);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.create(productData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() productData: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, productData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.productService.remove(id);
  }

  @Get('category/:categoryId')
  async findByCategory(
    @Param('categoryId') categoryId: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findByCategory(categoryId, page, pageSize, sort);
  }

  @Get('hasDiscount/:hasDiscount')
  async findProductsByHasDiscount(
  @Param('hasDiscount') hasDiscount: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByHasDiscount(hasDiscount, page, pageSize, sort);
  }


  @Get('isNew/:isNew')
  async findProductsByIsNew(
  @Param('isNew') isNew: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByIsNew(isNew, page, pageSize, sort);
  }


  @Get('isNewOrHasDiscount/:isNew/:hasDiscount')
  async findProductsByFilter(
    @Param('isNew') isNew: boolean,
    @Param('hasDiscount') hasDiscount: boolean,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByFilter(isNew, hasDiscount, page, pageSize, sort);
  }

  @Get('isNewAndHasDiscount/:isNew/:hasDiscount')
  async findProductsByIsNewAndHasDiscount(
  @Param('isNew') isNew: boolean,
  @Param('hasDiscount') hasDiscount: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByIsNewAndHasDiscount(isNew, hasDiscount, page, pageSize, sort);
  }


  @Get('category/:categoryId/hasDiscount/:hasDiscount')
  async findByCategoryAndHasDiscount(
  @Param('categoryId') categoryId: number,
  @Param('hasDiscount') hasDiscount: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByCategoryAndHasDiscount(categoryId, hasDiscount, page, pageSize, sort);
  }

  @Get('category/:categoryId/isNew/:isNew')
  async findByCategoryAndIsNew(
  @Param('categoryId') categoryId: number,
  @Param('isNew') isNew: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByCategoryAndIsNew(categoryId, isNew, page, pageSize, sort);
  }
  
  @Get('category/:categoryId/isNew/:isNew/hasDiscount/:hasDiscount')
  async findByCategoryAndIsNewAndHasDiscount(
  @Param('categoryId') categoryId: number,
  @Param('isNew') isNew: boolean,
  @Param('hasDiscount') hasDiscount: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByCategoryAndIsNewAndHasDiscount(categoryId, isNew, hasDiscount, page, pageSize, sort);
  }

  @Get('categoryOr/:categoryId/isNew/:isNew/hasDiscount/:hasDiscount')
  async findByCategoryAndIsNewOrHasDiscount(
  @Param('categoryId') categoryId: number,
  @Param('isNew') isNew: boolean,
  @Param('hasDiscount') hasDiscount: boolean,
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 16,
  @Query('sort') sort: 'asc' | 'desc' | 'none' = 'asc',
  ): Promise<Product[]> {
    return this.productService.findProductsByCategoryAndIsNewOrHasDiscount(categoryId, isNew, hasDiscount, page, pageSize, sort);
  }

}
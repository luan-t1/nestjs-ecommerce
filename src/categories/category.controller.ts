import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() categoryData: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(categoryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
  await this.categoryService.remove(id);
  }
}
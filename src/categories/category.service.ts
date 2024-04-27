import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: any): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.image_link = createCategoryDto.image_link;
    category.products = []; // Inicializa a lista de produtos como vazia

    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);
    category.name = updateCategoryDto.name;
    category.image_link = updateCategoryDto.image_link;

    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    try {
      const categoryToRemove = await this.findById(id);
      await this.categoryRepository.remove(categoryToRemove);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      throw new InternalServerErrorException('Erro interno ao excluir categoria');
    }
  }
}
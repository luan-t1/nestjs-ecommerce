import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';
import { Not, IsNull } from 'typeorm';
import { Between } from 'typeorm';
import { UpdateProductDto } from './product.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}


  async findAll(page: number, pageSize: number, sort: 'asc' | 'desc' | 'none'): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    let options: FindManyOptions<Product> = {
      take: pageSize,
      skip,
    };

    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' };
    }

    return this.productRepository.find(options);
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return product;
  }


async create(productData: CreateProductDto): Promise<Product> {
  const product = new Product();
  product.name = productData.name;
  product.sku = productData.sku;
  product.description = productData.description;
  product.large_description = productData.large_description;
  product.price = productData.price;
  product.discount_price = productData.discount_price;
  product.discount_percent = productData.discount_percent;
  product.is_new = productData.is_new;
  product.has_discount = productData.has_discount;
  product.image_link = productData.image_link;
  product.other_images_link = productData.other_images_link;
  product.categoryId = productData.categoryId;

  return this.productRepository.save(product);
  }

  async update(id: number, productData: UpdateProductDto): Promise<Product> {
    const product = await this.findById(id);
    
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        product[key] = productData[key];
      }
    }

    if (productData.categoryId !== undefined) {
      product.categoryId = productData.categoryId;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const productToRemove = await this.findById(id);
    await this.productRepository.remove(productToRemove);
  }

  async findByCategory(
    categoryId: number,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    let options: FindManyOptions<Product> = {
      where: { categoryId },
      take: pageSize,
      skip,
    };

    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' };
    }

    return this.productRepository.find(options);
  }


  async findProductsByHasDiscount(
    hasDiscount: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    let options: FindManyOptions<Product> = {
      where: { has_discount: hasDiscount }, 
      take: pageSize,
      skip,
    };
  
    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' };
    }
  
    return this.productRepository.find(options);
  }
  
  async findProductsByIsNew(
    isNew: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;
  
    let options: FindManyOptions<Product> = {
      where: { is_new: isNew },
      take: pageSize,
      skip,
    };
  
    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' };
    }
  
    return this.productRepository.find(options);
  }


  async findProductsByFilter(
    isNew: boolean,
    hasDiscount: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder.where('product.is_new = :isNew OR product.has_discount = :hasDiscount', { isNew, hasDiscount });
    queryBuilder.take(pageSize);
    queryBuilder.skip(skip);
    
    if (sort !== 'none') {
      queryBuilder.orderBy('product.price', sort === 'asc' ? 'ASC' : 'DESC');
    }

    return queryBuilder.getMany();
  }

  async findProductsByIsNewAndHasDiscount(
    isNew: boolean,
    hasDiscount: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;
  
    let options: FindManyOptions<Product> = {
      where: { is_new: isNew, has_discount: hasDiscount },
      take: pageSize,
      skip,
    };
  
    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' }; 
    }
  
    return this.productRepository.find(options);
  }


  async findProductsByCategoryAndHasDiscount(
    categoryId: number,
    hasDiscount: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;
  
    let options: FindManyOptions<Product> = {
      where: { categoryId, has_discount: hasDiscount },
      take: pageSize,
      skip,
    };
  
    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' };
    }
  
    return this.productRepository.find(options);
  }

  async findProductsByCategoryAndIsNew(
    categoryId: number,
    isNew: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;
  
    let options: FindManyOptions<Product> = {
      where: { categoryId, is_new: isNew },
      take: pageSize,
      skip,
    };
  
    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' };
    }
  
    return this.productRepository.find(options);
  }

  async findProductsByCategoryAndIsNewAndHasDiscount(
    categoryId: number,
    isNew: boolean,
    hasDiscount: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;
  
    const query = this.productRepository.createQueryBuilder('product');
  
    if (isNew && hasDiscount) {
      query.where('product.categoryId = :categoryId AND product.is_new = :isNew AND product.has_discount = :hasDiscount')
        .setParameters({ categoryId, isNew, hasDiscount });
    } else if (isNew) {
      query.where('product.categoryId = :categoryId AND product.is_new = :isNew')
        .setParameters({ categoryId, isNew });
    } else if (hasDiscount) {
      query.where('product.categoryId = :categoryId AND product.has_discount = :hasDiscount')
        .setParameters({ categoryId, hasDiscount });
    } else {
      query.where('product.categoryId = :categoryId')
        .setParameter('categoryId', categoryId);
    }
  
    if (sort !== 'none') {
      query.orderBy('product.price', sort === 'asc' ? 'ASC' : 'DESC');
    }
  
    const products = await query.skip(skip).take(pageSize).getMany();
    return products;
  }

  async findProductsByCategoryAndIsNewOrHasDiscount(
    categoryId: number,
    isNew: boolean,
    hasDiscount: boolean,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;
  
    const query = this.productRepository.createQueryBuilder('product');
  
    if (isNew && hasDiscount) {
      query.where('product.categoryId = :categoryId AND (product.is_new = :isNew OR product.has_discount = :hasDiscount)')
        .setParameters({ categoryId, isNew, hasDiscount });
    } else if (isNew) {
      query.where('product.categoryId = :categoryId AND product.is_new = :isNew')
        .setParameters({ categoryId, isNew });
    } else if (hasDiscount) {
      query.where('product.categoryId = :categoryId AND product.has_discount = :hasDiscount')
        .setParameters({ categoryId, hasDiscount });
    } else {
      query.where('product.categoryId = :categoryId')
        .setParameter('categoryId', categoryId);
    }
  
    if (sort !== 'none') {
      query.orderBy('product.price', sort === 'asc' ? 'ASC' : 'DESC');
    }
  
    const products = await query.skip(skip).take(pageSize).getMany();
    return products;
  }

  
}
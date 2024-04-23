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


  //async findAll(): Promise<Product[]> {
    //return this.productRepository.find();
  //}

  async findAll(page: number, pageSize: number, sort: 'asc' | 'desc' | 'none'): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    // Opções de consulta para a ordem de classificação
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

    // Criar uma nova instância do produto
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

    // Salvar o produto no banco de dados
    return this.productRepository.save(product);
  }

  async update(id: number, productData: UpdateProductDto): Promise<Product> {
    const product = await this.findById(id);
    
    // Atualizar os campos que estão presentes no productData
    for (const key in productData) {
      if (productData.hasOwnProperty(key)) {
        product[key] = productData[key];
      }
    }

    // Verificar se categoryId está presente em productData
    if (productData.categoryId !== undefined) {
      product.categoryId = productData.categoryId;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const productToRemove = await this.findById(id);
    await this.productRepository.remove(productToRemove);
  }

  //async findByCategory(categoryId: number): Promise<Product[]> {
  //  return this.productRepository.find({ where: { categoryId } });
  //}

  async findByCategory(
    categoryId: number,
    page: number,
    pageSize: number,
    sort: 'asc' | 'desc' | 'none',
  ): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    // Opções de consulta para a ordem de classificação
    let options: FindManyOptions<Product> = {
      where: { categoryId }, // Filtrar por categoria
      take: pageSize,
      skip,
    };

    if (sort !== 'none') {
      options.order = { price: sort === 'asc' ? 'ASC' : 'DESC' }; // Ordenar por preço na ordem especificada
    }

    return this.productRepository.find(options);
  }

  async findProductsByHasDiscount(hasDiscount: boolean): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        has_discount: hasDiscount
      },
    });
  }

  async findProductsByIsNew(isNew: boolean): Promise<Product[]> {
    return this.productRepository.find({ where: { is_new: isNew } });
  }

  async findProductsByIsNewAndHasDiscount(isNew: boolean, hasDiscount: boolean): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');

    if (isNew && hasDiscount) {
      return query.where('product.is_new = :isNew AND product.has_discount = :hasDiscount').setParameters({ isNew, hasDiscount }).getMany();
    } else if (isNew) {
      return query.where('product.is_new = :isNew').setParameter('isNew', isNew).getMany();
    } else if (hasDiscount) {
      return query.where('product.has_discount = :hasDiscount').setParameter('hasDiscount', hasDiscount).getMany();
    } else {
      return query.getMany();
    }
  }

  async findProductsByCategoryAndIsNewAndHasDiscount(categoryId: number, isNew: boolean, hasDiscount: boolean): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');

    if (isNew && hasDiscount) {
      return query.where('product.categoryId = :categoryId AND product.is_new = :isNew AND product.has_discount = :hasDiscount')
        .setParameters({ categoryId, isNew, hasDiscount })
        .getMany();
    } else if (isNew) {
      return query.where('product.categoryId = :categoryId AND product.is_new = :isNew')
        .setParameters({ categoryId, isNew })
        .getMany();
    } else if (hasDiscount) {
      return query.where('product.categoryId = :categoryId AND product.has_discount = :hasDiscount')
        .setParameters({ categoryId, hasDiscount })
        .getMany();
    } else {
      return query.where('product.categoryId = :categoryId')
        .setParameter('categoryId', categoryId)
        .getMany();
    }
  }
}
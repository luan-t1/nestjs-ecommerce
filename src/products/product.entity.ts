import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 10, nullable: false })
  sku: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ nullable: false })
  categoryId: number;

  @Column({length:250, nullable: false})
  description: string;

  @Column({length:500, nullable: false})
  large_description: string;

  @Column({type: 'float', nullable: false})
  price: number;

  @Column({type: 'float'})
  discount_price: number;

  @Column({type: 'int'})
  discount_percent: number;

  @Column()
  is_new: boolean;

  @Column()
  has_discount: boolean;

  @Column({length:250})
  image_link: string;

  //@Column({length: 1000})
  //other_images_link: string;

  @Column('varchar', { array: true, length: 1000, nullable: true }) // Alteração aqui
  other_images_link: string[]; // Alteração aqui


  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
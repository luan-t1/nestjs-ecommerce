import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50, nullable: false})
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @Column({length:250})
  image_link: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from 'src/domains/products/main/entities/product.entity';

@Entity('product_variants')
export class ProductVariantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @Column({ name: 'color', type: 'varchar', length: 50 })
  color?: string;

  @Column({ name: 'size', type: 'varchar', length: 50 })
  size?: string;

  @Column({ name: 'stock_status', type: 'varchar', default: 'in_stock' })
  stockStatus: 'in_stock' | 'out_of_stock' | 'preorder';

  @Column({
    name: 'price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

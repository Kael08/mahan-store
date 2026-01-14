import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from 'src/domains/products/main/entities/product.entity';

@Entity('product_images')
export class ProductImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @Column({ name: 'image_url', type: 'varchar', length: 512, nullable: false })
  imageUrl: string;

  @Column({ name: 'is_main', type: 'boolean', default: false })
  isMain: boolean;

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

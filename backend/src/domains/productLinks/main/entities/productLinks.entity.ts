import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from 'src/domains/products/main/entities/product.entity';

export class ProductLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.links)
  product: ProductEntity;

  @Column({ name: 'url', type: 'varchar', length: 512, nullable: false })
  url: string;

  @Column({ name: 'platform', type: 'varchar', length: 100, nullable: true })
  platform?: string;

  @Column({ name: 'label', type: 'varchar', length: '100', nullable: true })
  label?: string;

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

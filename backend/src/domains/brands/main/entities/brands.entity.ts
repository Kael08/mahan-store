import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from 'src/domains/products/main/entities/product.entity';

@Entity('brands')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: ProductEntity[];

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'logo_url', type: 'varchar', length: 512 })
  logoUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

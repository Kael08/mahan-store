import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SellerEntity } from 'src/domains/sellers/main/entities/seller.entity';
import { CategoryEntity } from 'src/domains/categories/main/entities/categories.entity';
import { BrandEntity } from 'src/domains/brands/main/entities/brands.entity';
import { ProductVariantEntity } from 'src/domains/productVariants/main/entities/productVariants.entity';
import { ProductImageEntity } from 'src/domains/productImages/main/entities/productImages.entity';
import { ProductLinkEntity } from 'src/domains/productLinks/main/entities/productLinks.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SellerEntity, (seller) => seller.products, {
    onDelete: 'CASCADE',
  })
  seller: SellerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, { nullable: true })
  brand?: BrandEntity;

  @OneToMany(() => ProductVariantEntity, (variant) => variant.product)
  variants: ProductVariantEntity[];

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  images: ProductImageEntity[];

  @OneToMany(() => ProductLinkEntity, (link) => link.product)
  links: ProductLinkEntity[];

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({
    name: 'price_min',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  priceMin?: number;

  @Column({
    name: 'price_max',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  priceMax?: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'priority_boost', type: 'integer', default: 0 })
  priorityBoost: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

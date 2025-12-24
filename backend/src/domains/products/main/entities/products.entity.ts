import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'title',type: 'varchar', nullable: false})
    title: string;

    @Column({name: 'description',type:'text',nullable: true})
    description?: string;

    @Column({name:'created_at',type:'timestamp', nullable: true})
    createdAt: Date;

    @Column({name:'updated_at',type:'timestamp', nullable: true})
    updatedAt: Date;
}
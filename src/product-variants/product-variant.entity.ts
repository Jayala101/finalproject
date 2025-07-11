import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  product_id: string;

  @Column('uuid')
  attribute_id: string;

  @Column()
  value: string; // e.g., "red", "L"

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price_adjustment: number;

  @Column({ nullable: true })
  sku_suffix: string; // e.g., "-RED", "-L"

  // Relations will be added later to avoid circular imports
}

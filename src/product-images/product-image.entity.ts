import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  product_id: string;

  @Column()
  image_url: string;

  @Column({ default: false })
  is_primary: boolean;

  @Column({ nullable: true })
  alt_text: string;

  // Relations will be added later to avoid circular imports
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  cart_id: string;

  @Column('uuid')
  product_id: string;

  @Column('int')
  quantity: number;

  // Relations will be added later to avoid circular imports
}

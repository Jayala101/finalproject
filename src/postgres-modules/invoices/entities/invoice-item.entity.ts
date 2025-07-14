// invoice-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Invoice } from './invoice.entity';

@Entity('invoice_items')
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @Column()
  subtotal: number;

  @ManyToOne(() => Invoice, { eager: true })
  invoice: Invoice;

  @ManyToOne(() => Product, { eager: true })
  product: Product;
}

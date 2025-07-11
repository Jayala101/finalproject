import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discount_type: DiscountType;

  @Column('decimal', { precision: 10, scale: 2 })
  discount_value: number;

  @Column('timestamp')
  valid_from: Date;

  @Column('timestamp')
  valid_to: Date;

  @Column('int', { nullable: true })
  max_uses: number;

  @Column('int', { default: 0 })
  current_uses: number;
}

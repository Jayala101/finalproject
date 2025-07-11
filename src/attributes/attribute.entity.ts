import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "color", "size"

  @Column('jsonb')
  values: string[]; // e.g., ["red", "blue", "green"] or ["S", "M", "L", "XL"]

  // Relations will be added later to avoid circular imports
}

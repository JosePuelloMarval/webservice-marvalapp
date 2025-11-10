import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Property } from './Property';

@Entity('real_state')
export class RealState extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  hc!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  project_type!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 255 })
  address!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price_from_general!: number;

  @Column({ type: 'integer' })
  bathrooms!: number;

  @Column({ type: 'integer' })
  rooms!: number;

  @Column({ type: 'varchar' })
  built_area!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagen_url?: string;

  @OneToMany(() => Property, (property) => property.realstate, { cascade: true })
  properties!: Property[];
}

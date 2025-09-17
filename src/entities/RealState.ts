import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { AccountStatus } from './AccountStatus';

@Entity('realstate')
export class RealState extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  hc!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  typology!: string;

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

  @Column({ type: 'integer' })
  built_area!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagen_url?: string;
  accountStatus: AccountStatus | undefined;
}

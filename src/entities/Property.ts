import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { RealState } from './RealState';
import { AccountStatus } from './AccountStatus';

@Entity('properties')
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  typology!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value_of_mandatory_kits!: number;

  @Column({ type: 'integer' })
  unit_number!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parking_spaces!: string;

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

  @ManyToOne(() => RealState, (realstate) => realstate.properties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'real_state_id' })
  realstate!: RealState;

  @ManyToOne(() => AccountStatus, (accountStatus) => accountStatus.properties, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'account_status_id' })
  accountStatus!: AccountStatus | null;
}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { RealState } from './RealState';

@Entity('property')
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

 @Column({ type: 'varchar' })
  hc!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  typology!: string;

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

  @ManyToOne(() => RealState, (realstate: RealState) => realstate.property)
  @JoinColumn({ name: 'id' })
  realstate!: RealState;

}

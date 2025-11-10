import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('pqr_history_summary')
export class PqrHistorySummary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  caseNumber!: string;

  @Column()
  subject!: string;

  @Column()
  status!: string;

  @Column('bigint')
  timestamp!: number;

  @Column()
  last_message_preview!: string;

  @ManyToOne(() => User, (user) => user.pqrHistorySummaries)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Payment } from './Payment';
import { User } from './User';

@Entity('account_status')
export class AccountStatus extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.accountStatuses, { onDelete: 'CASCADE' })
  user!: User;

  @Column('decimal', { precision: 15, scale: 2 })
  totalAmount!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  initialOwnResources!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  initialSpecialResources!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  financeOtherEntities!: number;

  @Column({ type: 'date' })
  cutOffDate!: Date;

  @Column()
  offerNumber!: string;

  @Column('int')
  commitmentsPact!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  commitmentsPactValue!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  commitmentsPaid!: number;

  @Column('int')
  commitmentsPending!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  commitmentsPendingValue!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  commitmentsLateValue!: number;

  @Column({ type: 'date', nullable: true })
  lastPaymentDate!: Date;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  lastPaymentValue!: number;

  @Column({ type: 'date', nullable: true })
  nextCommitmentDate!: Date;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  nextCommitmentValue!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  interestLate!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  writingExpenses!: number;

  @Column('decimal', { precision: 15, scale: 2 })
  pendingBalance!: number;

  @Column({ type: 'date' })
  paymentDeadline!: Date;
  payments: Payment | undefined;
  realState: any;
}

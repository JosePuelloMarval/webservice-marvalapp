import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Payment } from './Payment';

@Entity('account_status')
export class AccountStatus extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

 @Column('uuid', { array: true, nullable: true })
  userIds?: string[];

 @OneToMany(() => AccountStatus, (accountStatus) => accountStatus.realState, { cascade: true })
  accountStatuses!: AccountStatus[];

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

import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('account_status')
export class AccountStatus extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    id!: string;

    @Column()
    userId!: string;

    @Column()
    projectId!: string;

    @Column('double')
    paidAmount!: number;

    @Column('double')
    totalAmount!: number;

    @Column()
    cutOffDate!: string;

    @Column()
    offerNumber!: string;

    @Column()
    commitmentsPact!: number;

    @Column()
    commitmentsPaid!: number;

    @Column()
    commitmentsPending!: number;

    @Column()
    commitmentsLate!: number;

    @Column()
    lastPaymentDate!: string;

    @Column('double')
    lastPaymentValue!: number;

    @Column()
    nextCommitmentDate!: string;

    @Column('double')
    nextCommitmentValue!: number;
}

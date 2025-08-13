import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('account_status')
export class AccountStatus extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    userId!: ObjectId; 

    @Column()
    realStateId!: ObjectId; 

    @Column('double')
    totalAmount!: number;

    @Column('double')
    initialOwnResources!: number;

    @Column('double')
    initialSpecialResources!: number;

    @Column('double')
    financeOtherEntities!: number;

    @Column()
    cutOffDate!: Date;

    @Column()
    offerNumber!: string;

    @Column()
    commitmentsPact!: number;

    @Column('double')
    commitmentsPactValue!: number;

    @Column('double')
    commitmentsPaid!: number;

    @Column()
    commitmentsPending!: number;

    @Column('double')
    commitmentsPendingValue!: number;

    @Column('double')
    commitmentsLateValue!: number;

    @Column()
    lastPaymentDate!: Date;

    @Column('double')
    lastPaymentValue!: number;

    @Column()
    nextCommitmentDate!: Date;

    @Column('double')
    nextCommitmentValue!: number;

    @Column('double')
    interestLate!: number;

    @Column('double')
    writingExpenses!: number;

    @Column('double')
    pendingBalance!: number;

    @Column()
    paymentDeadline!: Date;
}

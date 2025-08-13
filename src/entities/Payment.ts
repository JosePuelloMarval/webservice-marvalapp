import { Entity, ObjectIdColumn, Column, BaseEntity, Index } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('payments')
export class Payment extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Index()
    @Column()
    accountStatusId!: ObjectId; 

    @Column()
    userId!: ObjectId;

    @Column('double')
    amount!: number;

    @Column()
    paymentDate!: Date;

    @Column()
    method!: string; 

    @Column()
    reference!: string; 

    @Column()
    paymentMethod!: string;

}

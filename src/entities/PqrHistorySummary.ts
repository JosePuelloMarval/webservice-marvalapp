import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('pqr_history_summary')
export class PqrHistorySummary extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

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

    @Column()
    userId!: ObjectId;
}

import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('realstate')
export class RealState extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    hc!: number;

    @Column()
    name!: string;

    @Column()
    slug!: string;

    @Column()
    address!: string;

    @Column()
    price_from_general!: number; 

    @Column()
    bathrooms!: number;
    
    @Column()
    rooms!: number;

    @Column()
    built_area!: number;

    @Column()
    description!: string;

    @Column({ nullable: true })
    imagen_url?: string;
}

import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('realstate')
export class RealState extends BaseEntity {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    hc!: number;

    @Column()
    name!: string;

    @Column()
    location!: string;

    @Column()
    price!: number; // si quieres usar decimales, MongoDB los trata como "number"

    @Column()
    bathrooms!: number;

    @Column()
    area!: number;

    @Column()
    description!: string;

    @Column({ nullable: true })
    imagen_url?: string;
}

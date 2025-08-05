import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('profile')
export class Profile extends BaseEntity {
    @ObjectIdColumn()
    id!: ObjectId;

    // Guardamos solo el ID del usuario como referencia manual
    @Column()
    userId!: ObjectId;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    city?: string;

    @Column({ nullable: true })
    country?: string;
}

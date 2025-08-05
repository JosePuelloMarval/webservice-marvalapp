import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('users')
export class User extends BaseEntity {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column({ select: false })
    password!: string;

    @Column({ unique: true })
    email!: string;

    // En lugar de @ManyToOne, guardamos el ID del rol
    @Column({ nullable: true })
    roleId?: ObjectId;

    // En lugar de @OneToOne, guardamos el ID del perfil
    @Column({ nullable: true })
    profileId?: ObjectId;
}

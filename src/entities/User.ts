import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('users')
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column({ select: false })
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    roleId?: ObjectId;

    @Column({ nullable: true })
    profileId?: ObjectId;

    @Column({ nullable: true})
    accountStatusId?: ObjectId;
}

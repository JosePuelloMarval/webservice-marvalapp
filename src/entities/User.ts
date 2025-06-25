import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne, JoinColumn} from 'typeorm';
import * as bcrypt from "bcrypt";
import { Role } from './Rol';
import { Profile } from './Profile';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false})
    lastname!: string;

    @Column({ select: false })
    password!: string;

    @Column({ unique: true })
    email!: string;

    @ManyToOne(() => Role, (role) => role.users, { nullable: true, onDelete: 'SET NULL', cascade: true })
    role!: Role;

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
    profile!: Profile;
}

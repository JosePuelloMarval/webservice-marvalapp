import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Role } from './Rol';
import { Profile } from './Profile';
import { AccountStatus } from './AccountStatus';
import { PqrHistorySummary } from './PqrHistorySummary';
import { Payment } from './Payment';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  lastname!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ unique: true, type: 'varchar', length: 150 })
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @OneToMany(() => Profile, (profile) => profile.user, { cascade: true })
  profiles!: Profile[];

  @OneToMany(() => AccountStatus, (accountStatus) => accountStatus.user, { cascade: true })
  accountStatuses!: AccountStatus[];

  @OneToMany(() => Payment, (payment) => payment.user, { cascade: true })
  payments!: Payment[];

  @OneToMany(() => PqrHistorySummary, (pqr) => pqr.user, { cascade: true })
  pqrHistorySummaries!: PqrHistorySummary[];
}

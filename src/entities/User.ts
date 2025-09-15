import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
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

  @Column({ select: false })
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

  @ManyToOne(() => Role, (role) => role.userIds)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile;

  @OneToOne(() => AccountStatus, (accountStatus) => accountStatus.user, { cascade: true })
  @JoinColumn({ name: 'account_status_id' })
  accountStatus?: AccountStatus;
  payments: Payment | undefined;
  pqrHistorySummaries: PqrHistorySummary | undefined;
}

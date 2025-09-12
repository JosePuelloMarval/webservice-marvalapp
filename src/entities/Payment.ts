import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Index,
} from "typeorm";
import { User } from "./User";
import { AccountStatus } from "./AccountStatus";

@Entity("payments")
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @ManyToOne(() => AccountStatus, (accountStatus) => accountStatus.payments, { eager: true })
  @JoinColumn({ name: "account_status_id" })
  accountStatus!: AccountStatus;

  @ManyToOne(() => User, (user) => user.payments, { eager: true })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column("decimal", { precision: 15, scale: 2 })
  amount!: number;

  @Column({ type: "timestamp" })
  paymentDate!: Date;

  @Column()
  method!: string;

  @Column()
  reference!: string;

  @Column()
  paymentMethod!: string;
}

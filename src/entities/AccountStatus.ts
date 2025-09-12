import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { RealState } from "./RealState"; // 👈 suponiendo que tienes esta entidad

@Entity("account_status")
export class AccountStatus extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Relaciones
  @ManyToOne(() => User, (user) => user.accountStatus, { eager: true })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => RealState, (realState) => realState.accountStatus, { eager: true })
  @JoinColumn({ name: "real_state_id" })
  realState!: RealState;

  // Campos numéricos (decimal recomendado para valores financieros)
  @Column("decimal", { precision: 15, scale: 2 })
  totalAmount!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  initialOwnResources!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  initialSpecialResources!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  financeOtherEntities!: number;

  // Fechas
  @Column({ type: "date" })
  cutOffDate!: Date;

  @Column()
  offerNumber!: string;

  @Column("int")
  commitmentsPact!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  commitmentsPactValue!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  commitmentsPaid!: number;

  @Column("int")
  commitmentsPending!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  commitmentsPendingValue!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  commitmentsLateValue!: number;

  @Column({ type: "date", nullable: true })
  lastPaymentDate!: Date;

  @Column("decimal", { precision: 15, scale: 2, nullable: true })
  lastPaymentValue!: number;

  @Column({ type: "date", nullable: true })
  nextCommitmentDate!: Date;

  @Column("decimal", { precision: 15, scale: 2, nullable: true })
  nextCommitmentValue!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  interestLate!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  writingExpenses!: number;

  @Column("decimal", { precision: 15, scale: 2 })
  pendingBalance!: number;

  @Column({ type: "date" })
  paymentDeadline!: Date;
    payments: any;
}

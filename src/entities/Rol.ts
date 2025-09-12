import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  role!: string;

  @Column("uuid", { array: true, nullable: true })
  userIds?: string[];
}

import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';


@Entity('roles')
export class Role extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column({ unique: true })
  role!: string;

  // Si necesitas guardar los usuarios asociados:
  @Column({ nullable: true })
  userIds?: ObjectId[];
}

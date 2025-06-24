import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne, JoinColumn, BeforeInsert, OneToMany} from 'typeorm';
import * as bcrypt from "bcrypt";
import { Role } from './Rol';
import { Perfil } from './Perfil';
import { PedidoPorUsuario } from './PedidoPorUsuario';
import { Venta } from './Venta';

@Entity('usuarios')
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        nullable: false,
    })
    nombre!: string;

    @Column({ unique: true })
    email!: string;

    @OneToMany(() => PedidoPorUsuario, pedidoPorUsuario => pedidoPorUsuario.usuario)
    pedidoPorUsuario!: PedidoPorUsuario[];

    
    @OneToMany(() => Venta, ventas => ventas.usuario)
    ventas!: Venta[];

    @Column({ select: false })
    password!: string;

    @ManyToOne(() => Role, (role) => role.usuarios, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'rol_id' })
    rol!: Role;

    @OneToOne(() => Perfil, (perfil) => perfil.usuario, { cascade: true })
    perfil!: Perfil;

}

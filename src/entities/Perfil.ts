import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('perfiles')
export class Perfil {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => Usuario, (usuario) => usuario.perfil, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @Column({ nullable: true })
    telefono!: string;

    @Column({ nullable: true })
    direccion!: string;

    @Column({ nullable: true })
    ciudad!: string;

    @Column({ nullable: true })
    pais!: string;
}

import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, Column } from 'typeorm';
import { Usuario } from './Usuario';
import { Pedido } from './Pedido';

@Entity('pedido_por_usuario')
export class PedidoPorUsuario {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Usuario, usuario => usuario.pedidoPorUsuario, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @ManyToOne(() => Pedido, pedido => pedido.pedidoPorUsuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pedido_id' })
    pedido!: Pedido;

    @CreateDateColumn()
    fechaAsignacion!: Date;
}

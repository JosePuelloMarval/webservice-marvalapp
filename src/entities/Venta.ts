import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Pedido } from './Pedido';

@Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => Pedido, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pedido_id' })
    pedido!: Pedido;

    @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @Column('decimal', { precision: 10, scale: 2 })
    total!: number;

    @Column({ type: 'enum', enum: ['tarjeta', 'paypal', 'transferencia', 'efectivo'] })
    metodo_pago!: string;
}

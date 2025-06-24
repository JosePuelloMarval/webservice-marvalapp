import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PedidoPorUsuario } from './PedidoPorUsuario';
import { ProductoPedido } from './ProductoPedido';

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToMany(() => PedidoPorUsuario, pedidoPorUsuario => pedidoPorUsuario.pedido)
    pedidoPorUsuario!: PedidoPorUsuario[];

    @Column({ type: 'enum', enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' })
    estado!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    total!: number;

    @OneToMany(() => ProductoPedido, (productoPedido: ProductoPedido) => productoPedido.pedido)
    productos!: ProductoPedido[];
    
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './Pedido';
import { Producto } from './Producto';

@Entity('productos_pedido')
export class ProductoPedido {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Pedido, (pedido) => pedido.productos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pedido_id' })
    pedido!: Pedido;

    @ManyToOne(() => Producto, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;

    @Column('int')
    cantidad!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    precio_unitario!: number;

    @Column('decimal', { precision: 10, scale: 2})// ,generatedType:'STORED',asExpression:'cantidad * precio_unitario'})
    subtotal!: number;
}

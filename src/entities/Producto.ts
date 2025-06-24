import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from './Categoria';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nombre!: string;

    @Column('text')
    descripcion!: string;

    @Column()
    material!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    peso!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    precio!: number;

    @Column('int', { default: 0 })
    stock!: number;

    @Column({ nullable: true })
    imagen_url!: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'categoria_id' })
    categoria!: Categoria;
}

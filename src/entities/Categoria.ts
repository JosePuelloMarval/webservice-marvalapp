import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Producto } from './Producto';

@Entity('categorias')
export class Categoria extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    nombre!: string;

    @Column({ nullable: true })
    descripcion!: string;

    @OneToMany(() => Producto, (producto: Producto) => producto.categoria)
    productos!: Producto[];
}

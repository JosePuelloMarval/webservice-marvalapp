import { Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
// import { Categoria } from './Categoria';

@Entity('realstate')
export class RealState extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('int',{ nullable: false })
    hc!: number;

    @Column('varchar',{ nullable: false })
    name!: string;

    @Column('text',{ nullable: false })
    location!: string;

    @Column('decimal',{ nullable: false })
    price!: string;

    @Column('int',{ nullable: false })
    bathrooms!: number;

    @Column('decimal',{ nullable: false })
    area!: number;

    @Column('varchar', { nullable: false})
    description!: string;

    @Column({ nullable: true })
    imagen_url!: string;
}

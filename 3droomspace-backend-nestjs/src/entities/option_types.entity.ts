import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import {Option} from './options.entity'

@Entity("option_types")
export class OptionType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({length: 50, unique: true})
    name: string;

    @Column({length: 50, unique: true})
    slug: string;

    @OneToMany(() => Option, option => option.optionType, {cascade: true})
    options: Option[];
}

import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId, JoinColumn
} from 'typeorm';
import {OptionType} from "./option_types.entity";

@Entity("options")
export class Option {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => OptionType, optionType => optionType.options)
    @JoinColumn({name: "optionTypeId", referencedColumnName: "id" })
    optionType: OptionType;

    @RelationId((option: Option) => option.optionType)
    @Column({type: 'integer', name: "optionTypeId"})
    optionTypeId: number;

    @Column({length:50, unique: true})
    key: string;

    @Column({length: 50})
    value: string;

    @Column({type: 'integer', default: 10, name: "order"})
    sort_order: number;

}

import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Property} from "./property.entity";
import {AuditColumns} from "../base_classes/audit_columns";

@Entity('property_photo')
export class PropertyPhoto extends AuditColumns {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Property, property =>property.id)
    property: Property;

    @RelationId((propPhoto: PropertyPhoto) => propPhoto.property)
    @Column({name: "propertyId", type: 'uuid'})
    propertyId: string;

    @Column({type: "varchar", length: 255})
    photo_url: string;

    @Column({length: 255, type: "varchar"})
    photo_caption: string;

    @Column({type: 'integer', default: 10, name: "order"})
    sort_order: number;

}

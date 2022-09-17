import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm';
import { Property } from "./property.entity";
import { User } from "./user.entity";
import { PublishColumns } from '../base_classes/publish_columns';

@Entity("listings")
export class Listing extends PublishColumns {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Property, property => property.id)
    property: Property;

    @RelationId((listing: Listing) => listing.property)
    @Column({ name: "propertyId" })
    propertyId: string;

    @ManyToOne('User')
    listing_agent: User;

    @RelationId((listing: Listing) => listing.listing_agent)
    @Column({ name: "listingAgentId" })
    listingAgentId: string;

    @Column({ type: "timestamp", default: "now()" })
    listing_date: Date;

    @Column({ length: 10, default: 'ACTIVE' })
    status: string;

    @Column({ length: 80, type: 'varchar' })
    summary: string;

    @Column({ length: 512, nullable: true, type: 'varchar' })
    description: string;

    @Column({ length: 50, default: 'by-appointment-only' })
    viewing: string;

    @Column({ type: "decimal", nullable: true })
    price: number;

    @Column({ type: "integer", default: 1 })
    lease_period_min: number;

    @Column({ type: "integer", nullable: true })
    lease_period_max: number;

    @Column({ type: "boolean", default: false })
    sublet_ok: boolean;

    @Column({ type: "integer", default: 2 })
    max_occupancy: number;

    @Column({ type: "boolean", default: false })
    pets_allowed: boolean;

    @Column({ type: "text", nullable: true })
    pet_restrictions: string;

    @Column({ type: "timestamp", nullable: true })
    date_available: Date;

    @Column({ length: 50, nullable: true })
    listing_agent_name: string;

    @Column({ type: "boolean", default: false })
    wifi_available: boolean;

    @Column({ type: "boolean", default: false })
    marijuana_ok: boolean;

    @Column({ type: "boolean", default: false })
    alcohol_ok: boolean;

    @Column({ type: 'boolean', default: false })
    smoking_ok: boolean;

    @Column({ type: 'boolean', default: false })
    furnished: boolean;

}

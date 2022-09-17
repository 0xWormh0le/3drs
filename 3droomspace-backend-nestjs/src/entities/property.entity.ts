import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { PropMgmtCo } from "./prop_mgmt_co.entity";
import { User } from "./user.entity";
import { AddressDto } from "../dtos/property/address.dto";
import { PostgisLocationDto } from '../dtos/property/postgis-location.dto';
import { PublishColumns } from '../base_classes/publish_columns';
import { Listing } from "./listing.entity";
import { PropertyPhoto } from './property_photo.entity';

export const Choice = {
    property_status: {
        Available: 'AVAILABLE'
    }
}

@Entity("properties")
export class Property extends PublishColumns {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(type => Listing, listing => listing.property)
    listings: Listing[];

    @ManyToOne(() => PropMgmtCo, prop_mgmt_co => prop_mgmt_co.id)
    prop_mgmt_co: PropMgmtCo;

    @RelationId((property: Property) => property.prop_mgmt_co)
    @Column({ name: "propMgmtCoId", nullable: true, type: 'uuid' })
    propMgmtCoId: string;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @RelationId((property: Property) => property.user)
    @Column({ name: "userId", type: 'uuid' })
    userId: string;

    @Column({ type: "json", nullable: true })
    address: AddressDto;

    @Column({ length: 50, nullable: true })
    city: string;

    @Column({ length: 50, nullable: true })
    state: string;

    @Column({ length: 50, nullable: true })
    postal_code: string;

    @Column({ length: 50, nullable: true })
    county: string;

    @Column({ length: 2, nullable: true })
    country_code_2: string;

    @Column({ length: 3, nullable: true })
    country_code_3: string;

    @Column({ length: 3, nullable: true })
    country_code_un: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "varchar", length: 80, nullable: true })
    summary: string;

    @Column({ length: 30, nullable: true })
    property_type: string;

    @Column({ type: "integer", nullable: true })
    bedrooms: number;

    @Column({ type: "decimal", nullable: true })
    bathrooms: number;

    @Column({ length: 100, nullable: true })
    parking: string;

    @Column({ length: 20, nullable: true })
    parking_type: string;

    @Column({ type: "integer", default: 0 })
    parking_num_spaces: number;

    @Column({ type: "boolean", default: false })
    accessible: boolean;

    @Column({ type: "integer", nullable: true, default: 1 })
    num_units: number;

    @Column({ length: 30, nullable: true })
    heating: string;

    @Column({ length: 30, nullable: true })
    cooling: string;

    @Column({ length: 30, nullable: true })
    laundry: string;

    @Column({ type: "integer", nullable: true })
    size_sq_ft: number;

    @Column({ type: "boolean", default: false })
    has_photos: boolean;

    @Column({ type: "integer", default: 0 })
    num_photos: number;

    @Column({ type: "boolean", default: false })
    has_floorplan: boolean;

    @Column({ type: "boolean", default: false })
    has_3d: boolean;

    @Column({ type: "boolean", default: false })
    has_activeListing: boolean;

    @Column({ length: 30, nullable: true, default: Choice.property_status.Available })
    property_status: string;

    // @ts-ignore
    @Column({
        type: 'geography', name: 'coords', nullable: true, transformer: {
            to: (coordinates): any => {
                return { type: 'Point', coordinates: [coordinates.long.slice(0, 15), coordinates.lat.slice(0, 15)] };
            },
            from: (v: any) => {
                return v;
            }
        }
    })
    coords: PostgisLocationDto;

    @Column({ type: "varchar", length: 15, nullable: true })
    latitude: string;

    @Column({ type: "varchar", length: 15, nullable: true })
    longitude: string;

    @OneToMany(type => PropertyPhoto, photo => photo.property)
    photos: PropertyPhoto[];
}

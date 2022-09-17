import {Column, Entity, Exclusion, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {Property} from './property.entity';
import {User} from './user.entity';
import {Listing} from './listing.entity';

@Entity("reservations")
@Exclusion('USING gist ("propertyId" WITH =, tsrange( "start_date", "end_date") With &&)')
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Property, property => property.id)
    property: Property;

    @RelationId((reservation: Reservation) => reservation.property)
    @Column({name: "propertyId", type: 'uuid'})
    propertyId: string;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @RelationId((reservation: Reservation) => reservation.user)
    @Column({name: "userId", type: 'uuid'})
    userId: string;

    @OneToOne(() => Listing, listing => listing.id)
    @JoinColumn({name: "listingId"})
    listing: Listing;

    @RelationId((reservation: Reservation) => reservation.listing)
    @Column({name: "listingId", type: 'uuid'})
    listingId: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;
}

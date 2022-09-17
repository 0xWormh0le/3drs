import {Connection} from "typeorm";
import {User} from "../entities/user.entity";
import {PropMgmtCo} from "../entities/prop_mgmt_co.entity";
import {Property} from "../entities/property.entity";
import {Listing} from "../entities/listing.entity";
import {OptionType} from "../entities/option_types.entity";
import {Option} from "../entities/options.entity";
import {PropertyPhoto} from '../entities/property_photo.entity';
import {Reservation} from '../entities/reservation.entity';

export const entityProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'PROP_MGMT_CO_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PropMgmtCo),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'PROPERTY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Property),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'LISTING_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Listing),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'OPTION_TYPE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OptionType),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'OPTIONS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Option),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'PROPERTY_PHOTO_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PropertyPhoto),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'RESERVATION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Reservation),
        inject: ['DATABASE_CONNECTION']
    },
];

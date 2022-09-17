import {ConnectionOptions, createConnection} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {ApiConfigService} from "../services/api-config.service";
import {OptionType} from "../entities/option_types.entity";
import {Option} from "../entities/options.entity";
import {Property} from "../entities/property.entity";
import {Listing} from "../entities/listing.entity";
import {PropMgmtCo} from "../entities/prop_mgmt_co.entity";
import {User} from "../entities/user.entity";
import {PropertyPhoto} from '../entities/property_photo.entity';
import {Reservation} from '../entities/reservation.entity';


export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            const configService = new ConfigService();
            const apiConfigService = new ApiConfigService(configService);
            const defaultOptions: ConnectionOptions = {
                type: 'postgres',
                host: apiConfigService.dbHost,
                port: apiConfigService.dbPort,
                username: apiConfigService.dbUser,
                password: apiConfigService.dbPass,
                database: apiConfigService.dbName,
                entities: [
                    OptionType,
                    Option,
                    Property,
                    Listing,
                    PropMgmtCo,
                    User,
                    PropertyPhoto,
                    Reservation,
                ],
                synchronize: true,
                // logging: ['query']
            };
            return await createConnection(defaultOptions);
        },
    },
];

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../elements/user/user.module';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {entityProviders} from "../providers/entity.providers";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./jwt.constants";
import {JwtUserStrategy} from "./jwt-user.strategy";
import {JwtSuperAdminStrategy} from "./jwt-superadmin.strategy";
import {JwtLandlordStrategy} from "./jwt-landlord.strategy";
import {JwtRenterStrategy} from './jwt-renter.strategy';
import {JwtSysadminStrategy} from './jwt-sysadmin.strategy';
import {JwtHostStrategy} from './jwt-host.strategy';
import {JwtSearchStrategy} from './jwt-search-strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.jwtSecret,
            signOptions: { expiresIn: jwtConstants.duration }
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtUserStrategy,
        JwtSuperAdminStrategy,
        JwtLandlordStrategy,
        JwtRenterStrategy,
        JwtSysadminStrategy,
        JwtHostStrategy,
        JwtSearchStrategy,
        ...entityProviders
    ],
    exports: [AuthService]
})
export class AuthModule {}

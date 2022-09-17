import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtRenterStrategy extends PassportStrategy(Strategy, 'renter') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.jwtSecret,
        });
        this.name = 'renter';
        console.log('jwt-user strategy: ', this.name);
    }

    async validate(payload: any) {
        // console.log('Payload: ', payload);
        const validUserTypes = ['SUPER-ADMIN', 'SYS-ADMIN', 'RENTER'];
        if (validUserTypes.indexOf(payload.type) !== -1) {
            return { userId: payload.id, username: payload.user, userType: payload.type };
        } else {
            throw new UnauthorizedException();
        }
    }
}

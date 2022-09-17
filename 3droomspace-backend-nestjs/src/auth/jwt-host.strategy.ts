import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtHostStrategy extends PassportStrategy(Strategy, 'host') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.jwtSecret,
        });
        this.name = 'host';
        console.log('jwt-host strategy: ', this.name);
    }

    async validate(payload: any) {
        // console.log('Payload: ', payload);
        const validUserTypes = ['SUPER-ADMIN', 'SYS-ADMIN', 'HOST'];
        if (validUserTypes.indexOf(payload.type) !== -1) {
            return { userId: payload.id, username: payload.user, userType: payload.type };
        } else {
            throw new UnauthorizedException();
        }
    }
}

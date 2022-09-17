import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'user') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.jwtSecret,
        });
        this.name = 'user';
        console.log('jwt-user strategy: ', this.name);
    }

    async validate(payload: any) {
        console.log('validate payload: ', payload);
        const validUserTypes = ['SUPER-ADMIN', 'SYS-ADMIN', 'RENTER', 'LANDLORD'];
        if (validUserTypes.indexOf(payload.type) !== -1) {
            return { userId: payload.id, username: payload.user, userType: payload.type, avatarUrl: payload.avatar_url };
        } else {
            throw new UnauthorizedException();
        }
    }
}

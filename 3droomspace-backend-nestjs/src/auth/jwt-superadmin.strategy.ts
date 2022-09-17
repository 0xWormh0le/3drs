import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtSuperAdminStrategy extends PassportStrategy(Strategy, 'super-admin') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.jwtSecret,
        });
        this.name = 'super-admin';
        console.log('jwt-super-admin strategy: ', this.name);
    }

    async validate(payload: any) {
        console.log('JwtSuperAdminStrategy - payload: ', payload);
        const domain = payload.user.split('@')[1].toLowerCase();
        console.log('JwtSuperAdminStrategy - domain: ', domain);
        if (payload.type === 'SUPER-ADMIN' && domain === '3droomspace.com') {
            return { userId: payload.id, username: payload.user, userType: payload.type };
        } else {
            throw new UnauthorizedException();
        }
    }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import { UserService } from '../elements/user/user.service';
import {randomBytes, pbkdf2Sync} from 'crypto'
import {jwtConstants} from "./jwt.constants";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    private DIGEST = 'RSA-SHA256';
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(username: string, password: string): Promise<any> {
        console.log('Auth Service - validateUser');
        const user = await this.userService.findOneForLogin(username);
        if (!!user) {
            const scope = ['create', 'read', 'update', 'delete' ];
            const hashCheck = pbkdf2Sync(password, user.salt, 1000, 64, this.DIGEST).toString('hex');
            if (user.hash === hashCheck) {
                this.userService.cleanResponse(user);
                const access_token = this.generateJwt(user.id, scope, user.user_type, user.email);
                return { user, access_token }
            } else {
                return null;
            }
        } else {
            throw new NotFoundException();
        }

    }

    generateJwt(id: string, scope: string[] | string, userType:string, userName: string) {
        const today = Date.now() / 1000; // current date/time in seconds
        const iat = Math.round(today);
        if(!Array.isArray(scope)) {
            scope = scope.split(',');
        }
        scope = scope || ["read"];
        let tokenObj = {
            user: userName,
            iss : jwtConstants.iss,
            iat : iat,
            aud : jwtConstants.aud,
            scope : scope,
            id: id,
            type: userType
        };
        return this.jwtService.sign(tokenObj, {expiresIn: jwtConstants.duration});
    }

    decodeJwt(token) {
        return this.jwtService.decode(token);
    }


    setPassword(password) {
        let salt = randomBytes(32).toString('hex');
        let hash = pbkdf2Sync(password, salt, 1000, 64, this.DIGEST).toString('hex');
        return {salt: salt, hash: hash};
    }
}

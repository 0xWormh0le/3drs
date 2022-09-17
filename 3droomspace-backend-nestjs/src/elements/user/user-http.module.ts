import {Module} from "@nestjs/common";
import {UserModule} from "./user.module";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {entityProviders} from "../../providers/entity.providers";


@Module({
    imports: [ UserModule],
    providers: [...entityProviders, UserService ],
    controllers: [ UserController ]
})
export class UserHttpModule {}

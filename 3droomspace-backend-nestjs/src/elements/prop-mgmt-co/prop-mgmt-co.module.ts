import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../providers/database.module";
import {entityProviders} from "../../providers/entity.providers";
import {PropMgmtCoService} from "./prop-mgmt-co.service";

@Module({
    imports: [ DatabaseModule ],
    providers: [...entityProviders,  PropMgmtCoService ],
    exports: [ DatabaseModule, PropMgmtCoService]
})
export class PropMgmtCoModule {}

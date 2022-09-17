import {Module} from "@nestjs/common";
import {PropMgmtCoModule} from "./prop-mgmt-co.module";
import {entityProviders} from "../../providers/entity.providers";
import {PropMgmtCoService} from "./prop-mgmt-co.service";

@Module({
    imports: [PropMgmtCoModule],
    providers: [...entityProviders, PropMgmtCoService],

})
export class PropMgmtCoHttpModule {}

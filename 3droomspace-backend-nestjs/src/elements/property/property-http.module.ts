import {Module} from "@nestjs/common";
import {PropertyModule} from "./property.module";
import {entityProviders} from "../../providers/entity.providers";
import {PropertyService} from "./property.service";

@Module({
    imports: [ PropertyModule],
    providers: [...entityProviders, PropertyService]
})
export class PropertyHttpModule {}

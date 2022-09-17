import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../providers/database.module";
import {entityProviders} from "../../providers/entity.providers";
import {PropertyService} from "./property.service";
import {PropertyPhotoService} from '../property-photos/property-photo.service';
import {PropertyPhotoModule} from '../property-photos/property-photo.module';

@Module({
    imports: [DatabaseModule, PropertyPhotoModule],
    providers: [...entityProviders, PropertyService, PropertyPhotoService],
    exports: [ DatabaseModule, PropertyService]
})
export class PropertyModule {}

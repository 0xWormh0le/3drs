import {Module} from '@nestjs/common';
import {DatabaseModule} from '../../providers/database.module';
import {entityProviders} from '../../providers/entity.providers';
import {FileUploadService} from '../file-upload/file-upload.service';

@Module({
    imports: [DatabaseModule],
    providers: [...entityProviders, FileUploadService],
    exports: [DatabaseModule, FileUploadService]
})
export class PropertyPhotoModule{}

import {Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {UserService} from '../user/user.service';
import {PropertyService} from '../property/property.service';
import {PropertyPhotoService} from '../property-photos/property-photo.service';
import {UserModule} from '../user/user.module';
import {FileUploadService} from './file-upload.service';

@Module({
    imports: [
        MulterModule,
        UserModule
    ],
    providers: [

    ],
    exports: []
})
export class FileUploadModule {}

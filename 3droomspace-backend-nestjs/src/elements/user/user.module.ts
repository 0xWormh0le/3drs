import { Module } from '@nestjs/common';
import {DatabaseModule} from "../../providers/database.module";
import {UserService} from "./user.service";
import {entityProviders} from "../../providers/entity.providers";
import {FileUploadService} from '../file-upload/file-upload.service';

@Module({
   imports: [ DatabaseModule ],
   providers: [...entityProviders,  UserService, FileUploadService  ],
   exports: [ DatabaseModule, UserService ]
})
export class UserModule {}

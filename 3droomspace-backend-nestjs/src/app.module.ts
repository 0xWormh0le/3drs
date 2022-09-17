import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {UserController} from "./elements/user/user.controller";
import {UserService} from "./elements/user/user.service";
import {UserHttpModule} from "./elements/user/user-http.module";
import {UserModule} from "./elements/user/user.module";
import {ApiConfigService} from "./services/api-config.service";
import {DatabaseModule} from "./providers/database.module";
import {entityProviders} from "./providers/entity.providers";
import {AuthModule} from "./auth/auth.module";

import {PropMgmtCoModule} from "./elements/prop-mgmt-co/prop-mgmt-co.module";
import {PropMgmtCoHttpModule} from "./elements/prop-mgmt-co/prop-mgmt-co-http.module";
import {PropMgmtCoService} from "./elements/prop-mgmt-co/prop-mgmt-co.service";
import {PropMgmtCoController} from "./elements/prop-mgmt-co/prop-mgmt-co.controller";
import {AuthController} from "./auth/auth.controller";
import {PropertyModule} from "./elements/property/property.module";
import {PropertyHttpModule} from "./elements/property/property-http.module";
import {PropertyController} from "./elements/property/property.controller";
import {PropertyService} from "./elements/property/property.service";
import {FileUploadModule} from './elements/file-upload/file-upload.module';
import {FileUploadController} from './elements/file-upload/file-upload.controller';
import {FileUploadService} from './elements/file-upload/file-upload.service';
import {PropertyPhotoController} from './elements/property-photos/property-photo.controller';
import {PropertyPhotoService} from './elements/property-photos/property-photo.service';
import {ListingController} from './elements/listing/listing.controller';
import {ListingService} from './elements/listing/listing.service';
import {OptionsModule} from './elements/options/options.module';
import {OptionHttpModule} from './elements/options/option-http.module';
import {OptionsController} from './elements/options/options.controller';
import {OptionsService} from './elements/options/options.service';

const hostname = process.env.HOSTNAME;
const env = process.env.NODE_ENV;
const configEnv = hostname === 'localhost' ? 'dev' : env === 'production' ? 'prod' : 'staging';

console.log('dirname: ', __dirname);
console.log('hostname: ', hostname);
console.log('env: ', env);
console.log('configEnv: ', configEnv);
@Module({
  imports: [
      ConfigModule.forRoot({ envFilePath: `${__dirname}/config/${configEnv}/.env`, isGlobal: true}),
      DatabaseModule,
      AuthModule,
      UserModule,
      PropMgmtCoModule,
      PropertyModule,
      FileUploadModule,
      OptionsModule,
  ],
  controllers: [
      AppController,
      AuthController,
      UserController,
      PropMgmtCoController,
      PropertyController,
      FileUploadController,
      PropertyPhotoController,
      ListingController,
      OptionsController,
  ],
  providers: [
      ApiConfigService,
      AppService,
      UserService,
      PropMgmtCoService,
      PropertyService,
      FileUploadService,
      PropertyPhotoService,
      ListingService,
      OptionsService,
      ...entityProviders
  ],
    exports: [DatabaseModule]
})
export class AppModule {
    constructor() {}
}

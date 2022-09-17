import {Module} from '@nestjs/common';
import {DatabaseModule} from '../../providers/database.module';
import {entityProviders} from '../../providers/entity.providers';
import {OptionsService} from './options.service';

@Module({
    imports: [DatabaseModule],
    providers:[...entityProviders, OptionsService],
    exports: [DatabaseModule, OptionsService]
})
export class OptionsModule {}

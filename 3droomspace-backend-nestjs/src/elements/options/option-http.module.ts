import {Module} from '@nestjs/common';
import {OptionsModule} from './options.module';
import {entityProviders} from '../../providers/entity.providers';
import {OptionsService} from './options.service';

@Module({
    imports: [OptionsModule],
    providers: [...entityProviders, OptionsService]
})
export class OptionHttpModule {}

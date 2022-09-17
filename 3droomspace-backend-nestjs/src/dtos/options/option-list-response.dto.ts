import {ApiProperty} from '@nestjs/swagger';
import {OptionValueCreateResponseDto} from './option-value-create-response.dto';

export class OptionListResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    slug: string;
    options: OptionValueCreateResponseDto[];
}

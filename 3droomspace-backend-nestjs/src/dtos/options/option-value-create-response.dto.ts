import {ApiProperty} from '@nestjs/swagger';

export class OptionValueCreateResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    optionTypeId: number;

    @ApiProperty()
    key: string;

    @ApiProperty()
    value: string;

    @ApiProperty()
    sort_order: number;
}

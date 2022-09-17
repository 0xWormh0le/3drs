import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class OptionValueUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    optionTypeId: number;

    @ApiProperty()
    @IsOptional()
    key: string;

    @ApiProperty()
    @IsOptional()
    value: string;

    @ApiProperty()
    @IsOptional()
    sort_order: number;
}

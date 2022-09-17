import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class OptionValueCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    optionTypeId: number;

    @ApiProperty()
    @IsNotEmpty()
    key: string;

    @ApiProperty()
    @IsNotEmpty()
    value: string;

    @ApiProperty()
    @IsOptional()
    sort_order: number;
}

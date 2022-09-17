import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class BoundsDto {
    @ApiProperty()
    @IsNotEmpty()
    lngW: number;

    @ApiProperty()
    @IsNotEmpty()
    latS: number;

    @ApiProperty()
    @IsNotEmpty()
    lngE: number;

    @ApiProperty()
    @IsNotEmpty()
    latN: number;
}

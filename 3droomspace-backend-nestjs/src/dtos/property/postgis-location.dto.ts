import {Equals, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PostgisLocationDto {
    @ApiProperty({type: String, description: '"Point" is the only type supported at this time.'})
    @IsNotEmpty()
    @Equals('Point')
    type: string;

    @ApiProperty( {type: [Number],  description: 'Array of coordinates with longitude first, latitude second.'})
    @IsNotEmpty()
    coordinates: number[]
}

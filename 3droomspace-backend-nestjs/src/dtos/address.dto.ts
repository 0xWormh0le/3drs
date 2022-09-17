import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class AddressDto {
    @ApiProperty()
    @IsNotEmpty()
    address_line1: string;

    @ApiProperty()
    @IsOptional()
    address_line2: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    postal_code: string;

    @ApiProperty()
    @IsOptional()
    county: string;
}

import {ApiProperty} from "@nestjs/swagger";
import {IsDecimal, IsInt, IsNotEmpty, IsNumber, IsNumberString, ValidateNested} from 'class-validator';
import {AddressDto} from './address.dto';
import {ParseIntPipe} from '@nestjs/common';

export class PropertyCreateDto {
    @ApiProperty()
    prop_mgmt_co_fk: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    address: AddressDto;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    bedrooms: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDecimal()
    bathrooms: number;

    @ApiProperty()
    parking: string;

    @ApiProperty()
    parking_type: string;

    @ApiProperty()
    parking_num_spaces: number;

    @ApiProperty()
    heating: string;

    @ApiProperty()
    cooling: string;

    @ApiProperty()
    laundry: string;

    @ApiProperty()
    @IsNotEmpty()
    property_type: string;

    @ApiProperty()
    property_status: string;

    @ApiProperty()
    size_sq_ft: number;

    @ApiProperty()
    accessible: boolean;
}

import {ApiProperty} from '@nestjs/swagger';
import {IsDecimal, IsNotEmpty, IsNumber, IsOptional, ValidateNested} from 'class-validator';
import {AddressDto} from './address.dto';
import {AddressUpdateDto} from './address.update.dto';

export class PropertyUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    prop_mgmt_co_fk: string;

    @ApiProperty()
    prop_manager_fk: string;

    @ApiProperty()
    @ValidateNested()
    address: AddressUpdateDto;

    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    bedrooms: number;

    @ApiProperty()
    @IsOptional()
    @IsDecimal({force_decimal: false})
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
    property_type: string;

    @ApiProperty()
    property_status: string;

    @ApiProperty()
    size_sq_ft: number;

    @ApiProperty()
    accessible: boolean;

    @ApiProperty()
    has_photos: boolean;

    @ApiProperty()
    num_photos: number;
}

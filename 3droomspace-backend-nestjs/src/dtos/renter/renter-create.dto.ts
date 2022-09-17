import {Equals, IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Column} from 'typeorm';
import {AddressDto} from '../property/address.dto';
import {LifestyleClass} from '../../classes/lifestyle.class';

export class RenterCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsOptional()
    middle_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('US')
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['self-registration', 'system'])
    created_by: string;

    @ApiProperty()
    @IsNotEmpty()
    @Equals('RENTER')
    user_type: string;

    @ApiProperty()
    @IsOptional()
    address: AddressDto;

    @ApiProperty()
    @IsOptional()
    lifestyle: LifestyleClass;

    @ApiProperty()
    @IsOptional()
    dob: Date;

    @ApiProperty()
    @IsOptional()
    relationship_status: string;

    @ApiProperty()
    @IsOptional()
    gender: string;

    @ApiProperty({})
    file: any;
}

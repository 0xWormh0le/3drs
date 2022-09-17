import {Equals, IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LandlordCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsOptional()
    prop_company_name: string;

    @ApiProperty()
    @IsOptional()
    companyId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('US')
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['invitation', 'system'])
    created_by: string;

    @ApiProperty()
    @IsNotEmpty()
    @Equals('LANDLORD')
    user_type: string;

    @ApiProperty()
    @IsOptional()
    invitation_code: string;
}

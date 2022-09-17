import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class LandlordCreateResponseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    middle_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    user_type: string;
    @ApiProperty()
    email_alt: string;
    @ApiProperty()
    phone_alt: string;
    @ApiProperty()
    avatar_url: string;
    @ApiProperty()
    prop_company_name: string;
    @ApiProperty()
    propMgmtCoId: string;
    @ApiProperty()
    created_date: string;
}

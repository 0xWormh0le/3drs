import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class LandlordUpdateDto {
    @ApiProperty()
    password: string;
    @ApiProperty()
    @IsNotEmpty()
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
    created_date: string;
}

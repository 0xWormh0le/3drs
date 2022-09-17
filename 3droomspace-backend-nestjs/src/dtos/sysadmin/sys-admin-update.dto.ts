import {ApiProperty} from '@nestjs/swagger';
import {Equals, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';

export class SysAdminUpdateDto{
    @ApiProperty()
    @IsOptional()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsOptional()
    first_name: string;

    @ApiProperty()
    @IsOptional()
    last_name: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('US')
    phone: string;

    @ApiProperty()
    @IsOptional()
    user_type: string;

    @ApiProperty()
    @IsOptional()
    avatar_url: string;
}

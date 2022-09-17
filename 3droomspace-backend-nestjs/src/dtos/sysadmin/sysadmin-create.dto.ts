import {ApiProperty} from '@nestjs/swagger';
import {Equals, IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator';

export class SysAdminCreateDto {
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
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('US')
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @Equals('system')
    created_by: string;

    @ApiProperty()
    @IsNotEmpty()
    user_type: string;
}

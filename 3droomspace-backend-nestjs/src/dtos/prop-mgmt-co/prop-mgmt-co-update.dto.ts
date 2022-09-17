import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl} from 'class-validator';

export class PropMgmtCoUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id:string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('US')
    phone: string;

    @ApiProperty()
    @IsUrl()
    url: string;

    @ApiProperty()
    address: string;
}

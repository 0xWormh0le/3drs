import { IsEmail, IsNotEmpty, IsPhoneNumber, IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PropMgmtCoCreateDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('US')
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsUrl()
    url: string;

    @ApiProperty()
    address: string;

}

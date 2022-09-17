import {ApiProperty} from '@nestjs/swagger';

export class PropMgmtCoUpdateResponseDto {
    @ApiProperty()
    id: string;
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    created_by: string;
    @ApiProperty()
    created_date: string;
    @ApiProperty()
    phone_alt: string;
    @ApiProperty()
    email_alt: string;
}

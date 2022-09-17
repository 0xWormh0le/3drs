import {ApiProperty} from '@nestjs/swagger';

export class LoginLandlordResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    middle_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    email_alt: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    phone_alt: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    avatar_url: string;

    @ApiProperty({example: 'LANDLORD'})
    user_type: string;

    @ApiProperty()
    company: string;

    @ApiProperty()
    companyId: string;

    @ApiProperty()
    prop_company_name: string;

    @ApiProperty()
    created_date: Date;
}

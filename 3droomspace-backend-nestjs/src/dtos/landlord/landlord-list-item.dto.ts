import {ApiProperty} from '@nestjs/swagger';
import {AddressClass} from '../../classes/address.class';
import {AuditColumnsDto} from '../audit-columns.dto';

export class LandlordListItemDto extends AuditColumnsDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    user_type: string;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    middle_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    fullName:string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    email_alt: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    phone_alt: string;
    @ApiProperty()
    avatar_url: string;
    @ApiProperty()
    address: AddressClass;
    @ApiProperty()
    prop_company_name: string;
    @ApiProperty()
    propMgmtCoId: string;
}

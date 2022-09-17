import {AuditColumnsDto} from '../audit-columns.dto';
import {ApiProperty} from '@nestjs/swagger';
import {LifestyleClass} from '../../classes/lifestyle.class';
import {AddressClass} from '../../classes/address.class';

export class RenterListItemDto extends AuditColumnsDto {
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
    fullName:string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    user_type: string;
    @ApiProperty()
    email_alt: string;
    @ApiProperty()
    phone_alt: string;
    @ApiProperty()
    address: AddressClass;
    @ApiProperty()
    dob: Date;
    @ApiProperty()
    relationship_status: string;
    @ApiProperty()
    gender: string;
    @ApiProperty()
    avatar_url: string;
    @ApiProperty()
    lifestyle: LifestyleClass;
    @ApiProperty()
    credit_score: string;
    @ApiProperty()
    credit_score_date: string;
    @ApiProperty()
    rental_score: string;
    @ApiProperty()
    rental_score_date: string;
}

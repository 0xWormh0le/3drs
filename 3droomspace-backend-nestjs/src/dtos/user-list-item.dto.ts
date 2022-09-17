import {ApiProperty} from '@nestjs/swagger';
import {AddressClass} from '../classes/address.class';
import {IsOptional} from 'class-validator';
import {LifestyleClass} from '../classes/lifestyle.class';
import {AuditColumnsDto} from './audit-columns.dto';

export class UserListItemDto extends AuditColumnsDto {
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
    dob: Date;
    @ApiProperty()
    relationship_status: string;
    @ApiProperty()
    gender: string;
    @ApiProperty()
    lifestyle: LifestyleClass;
    @ApiProperty()
    credit_score: string;
    @ApiProperty()
    credit_score_date: string;
    @ApiProperty()
    rental_score: number;
    @ApiProperty()
    rental_score_date: Date;
    @ApiProperty()
    prop_company_name: string;
    @ApiProperty()
    propMgmtCoId: string;
}

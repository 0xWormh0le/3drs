import {ApiExtraModels, ApiProperty} from '@nestjs/swagger';
import {LoginResponseDto} from './login-response.dto';

export class LoginRenterResponseDto {
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
    dob: Date;
    @ApiProperty()
    relationship_status: string;
    @ApiProperty()
    gender: string;
    @ApiProperty()
    avatar_url: string;
    @ApiProperty({example:'RENTER'})
    user_type: string;
    @ApiProperty()
    lifestyle: string;
    @ApiProperty()
    credit_score: number;
    @ApiProperty()
    credit_score_date: Date;
    @ApiProperty()
    created_date: Date;
}

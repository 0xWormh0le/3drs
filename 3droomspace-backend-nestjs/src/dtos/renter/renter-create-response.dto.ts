import {ApiProperty} from '@nestjs/swagger';

export class RenterCreateResponseDto {
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
    phone: string;
	@ApiProperty()
    user_type: string;
	@ApiProperty()
    email_alt: string;
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
	@ApiProperty()
    lifestyle: string;
	@ApiProperty()
    credit_score: string;
	@ApiProperty()
    credit_score_date: string;
	@ApiProperty()
    created_date: string;
}

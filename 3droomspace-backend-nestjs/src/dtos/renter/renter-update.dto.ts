import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator';

export class RenterUpdateDto {
    @ApiProperty()
    @IsOptional()
    password: string;
    @ApiProperty()
    @IsNotEmpty()
    id: string;
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;
	@ApiProperty()
    @IsOptional()
    first_name: string;
    @ApiProperty()
    @IsOptional()
    middle_name: string;
	@ApiProperty()
    last_name: string;
	@ApiProperty()
    @IsOptional()
    @IsPhoneNumber('US')
    phone: string;
	@ApiProperty()
    user_type: string;
	@ApiProperty()
    @IsOptional()
    email_alt: string;
	@ApiProperty()
    @IsOptional()
    phone_alt: string;
	@ApiProperty()
    @IsOptional()
    address: string;
	@ApiProperty()
    @IsOptional()
    dob: Date;
	@ApiProperty()
    @IsOptional()
    relationship_status: string;
	@ApiProperty()
    @IsOptional()
    gender: string;
	@ApiProperty()
    @IsOptional()
    avatar_url: string;
	@ApiProperty()
    @IsOptional()
    lifestyle: string;
	@ApiProperty()
    @IsOptional()
    credit_score: string;
	@ApiProperty()
    @IsOptional()
    credit_score_date: string;
}

import {ApiProperty} from '@nestjs/swagger';

export class SysadminCreateResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    user_type: string;
}

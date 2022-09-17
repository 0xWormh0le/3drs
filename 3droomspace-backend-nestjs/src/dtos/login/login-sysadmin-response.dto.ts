import {ApiExtraModels, ApiProperty} from '@nestjs/swagger';

export class LoginSysAdminResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    user_type: string;


}

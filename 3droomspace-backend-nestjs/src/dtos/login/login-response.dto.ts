import {ApiExtraModels, ApiProperty, ApiResponseProperty, getSchemaPath} from '@nestjs/swagger';
import {LoginSysAdminResponseDto} from './login-sysadmin-response.dto';
import {LoginLandlordResponseDto} from './login-landlord-response.dto';
import {LoginRenterResponseDto} from './login-renter-response.dto';

@ApiExtraModels(LoginRenterResponseDto, LoginLandlordResponseDto, LoginSysAdminResponseDto)
export class LoginResponseDto {
    @ApiProperty()
    access_token: string;

    @ApiProperty({
        oneOf: [
            { $ref: getSchemaPath(LoginSysAdminResponseDto)},
            { $ref: getSchemaPath(LoginLandlordResponseDto)},
            { $ref: getSchemaPath(LoginRenterResponseDto)}
        ],
        type: [LoginRenterResponseDto, LoginLandlordResponseDto, LoginSysAdminResponseDto],
        description: 'NOTE: The user property is not an array, this is an issue with Swagger when the response varies based on the user_type value'
    })
    user:LoginRenterResponseDto | LoginLandlordResponseDto | LoginSysAdminResponseDto;

}

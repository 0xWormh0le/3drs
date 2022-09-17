import {ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {LoginResponseDto} from "../dtos/login/login-response.dto";
import {LoginDto} from "../dtos/login/login.dto";
import {ErrorClass} from '../classes/error.class';

@ApiTags('Authorization')
@Controller('/auth')
export class AuthController {
    constructor() {}
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    @ApiCreatedResponse({
        type: LoginResponseDto,
        description: 'NOTE: The user property is not an array, this is an issue with Swagger when the response varies based on the user_type value'
    })
    @ApiUnauthorizedResponse({type: ErrorClass})
    async login(@Request() req, @Body() body: LoginDto) {
        // console.log('Login request: ', req);
        return req.user;
    }
}

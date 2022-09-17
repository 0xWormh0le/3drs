import {Body, Controller, Get, Post, UseGuards, Request, BadRequestException, Patch} from '@nestjs/common';
import {PropMgmtCoService} from "./prop-mgmt-co.service";
import {AuthGuard} from "@nestjs/passport";
import {PropMgmtCo} from "../../entities/prop_mgmt_co.entity";
import {PropMgmtCoCreateDto} from "../../dtos/prop-mgmt-co/prop-mgmt-co-create.dto";
import {AuthService} from "../../auth/auth.service";
import {plainToClass} from "class-transformer";
import {JwtTokenObj} from "../../classes/jwt-token-obj"
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {PropMgmtCoCreateResponseDto} from "../../dtos/prop-mgmt-co/prop-mgmt-co-create-response.dto";
import {ErrorClass} from '../../classes/error.class';
import {PropMgmtCoUpdateDto} from '../../dtos/prop-mgmt-co/prop-mgmt-co-update.dto';

@ApiTags('Property Management Companies')
@ApiBearerAuth()
@Controller('/api/companies')
export class PropMgmtCoController {
    constructor(
        private readonly propMgmtCoService: PropMgmtCoService,
        private readonly authService: AuthService
    ) {}

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN only. Get a list of all Property Management Companies'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all')
    findAll(): Promise<PropMgmtCo[]> {
        return this.propMgmtCoService.findAll();
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({summary:'LANDLORD or SUPER-ADMIN only. Register a Property Management Company'})
    @Post('/register')
    @ApiCreatedResponse({type: PropMgmtCoCreateResponseDto})
    @ApiUnauthorizedResponse({type: ErrorClass})
    async registerCompany(@Body() propCoDto: PropMgmtCoCreateDto, @Request() req) {
        const token = req.headers.authorization.split(' ')[1];
        const tokenObj: JwtTokenObj = this.authService.decodeJwt(token) as JwtTokenObj;
        const response =  await this.propMgmtCoService.createPropMgmtCo(propCoDto, tokenObj.user, tokenObj.id);
        console.log('Response: ', response);
        if(response) {
            return response;
        } else {
            throw new BadRequestException(`Create for Prop Mgmt Co: ${propCoDto.name} failed`);
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({summary:'Update Property Management Company'})
    @ApiCreatedResponse({type: PropMgmtCoCreateResponseDto})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update')
    async updatePropMgmtCo(@Body() propMgmtCo: PropMgmtCoUpdateDto, @Request() req): Promise<PropMgmtCoCreateResponseDto> {
        const response = await this.propMgmtCoService.updatePropMgmtCo(propMgmtCo, req.user);
        if(!!response) {
            return response;
        } else {
            throw new BadRequestException(`Update for Prop Mgmt Co - ${propMgmtCo.id} failed`);
        }
    }
}

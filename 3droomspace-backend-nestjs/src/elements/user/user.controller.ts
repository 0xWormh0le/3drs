import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param, Patch,
    Post,
    Request, UploadedFile,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {User} from "../../entities/user.entity";
import {UserService} from "./user.service";
import {AuthGuard} from "@nestjs/passport";
import {RenterCreateDto} from "../../dtos/renter/renter-create.dto";
import {LandlordCreateDto} from "../../dtos/landlord/landlord-create.dto";
import {
    ApiBearerAuth, ApiBody,
    ApiCreatedResponse,
    ApiExcludeEndpoint,
    ApiOperation, ApiParam,
    ApiResponse,
    ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {RenterCreateResponseDto} from "../../dtos/renter/renter-create-response.dto";
import {LandlordCreateResponseDto} from "../../dtos/landlord/landlord-create-response.dto";
import {AnyUserCreateDto} from '../../dtos/any-user-create.dto';
import {RenterUpdateDto} from '../../dtos/renter/renter-update.dto';
import {LandlordUpdateDto} from '../../dtos/landlord/landlord-update.dto';
import {SysAdminUpdateDto} from '../../dtos/sysadmin/sys-admin-update.dto';
import {SysadminCreateResponseDto} from '../../dtos/sysadmin/sysadmin-create-response.dto';
import {SysAdminCreateDto} from '../../dtos/sysadmin/sysadmin-create.dto';
import {ErrorClass} from '../../classes/error.class';
import {FileInterceptor} from '@nestjs/platform-express';
import {FileUploadDto} from '../../dtos/file-upload/fileUpload.dto';
import {FileUploadService} from '../file-upload/file-upload.service';
import {AvatarFileUploadDto} from '../../dtos/file-upload/avatarFileUpload.dto';
import {RenterListItemDto} from '../../dtos/renter/renter-list-item.dto';
import {LandlordListItemDto} from '../../dtos/landlord/landlord-list-item.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/api/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FileUploadService
        ) {}

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Users'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all')
    findAll(@Request() req): Promise<User[]> {
        return this.userService.findAll(req.user);
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Renters'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/renters')
    findAllRenters(): Promise<RenterListItemDto[]> {
        return this.userService.findAllRenters();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Renters'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/active/renters')
    findAllActiveRenters(): Promise<RenterListItemDto[]> {
        return this.userService.findAllActiveRenters();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Landlords'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/landlords')
    findAllLandlords(): Promise<LandlordListItemDto[]> {
        return this.userService.findAllLandlords();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Landlords'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/active/landlords')
    findAllActiveLandlords(): Promise<LandlordListItemDto[]> {
        return this.userService.findAllActiveLandlords();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Landlords'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/hosts')
    findAllHosts(): Promise<User[]> {
        return this.userService.findAllHosts();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Landlords'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/active/hosts')
    findAllActiveHosts(): Promise<User[]> {
        return this.userService.findAllActiveHosts();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Sys Admins'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/sysadmins')
    findAllSysAdmins(): Promise<User[]> {
        return this.userService.findAllSysAdmins();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. returns a list of all Sys Admins'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all/active/sysadmins')
    findAllActiveSysAdmins(): Promise<User[]> {
        return this.userService.findAllActiveSysAdmins();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary: 'SUPER-ADMIN only. Get one user by username (email)'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/username/')
    async findOneByUsername(@Body() body): Promise<User> {
        console.log('Request: ', body.username);
        const response = await this.userService.findOneForProfile(body.username);
        console.log('Response: ', response);
        if(!!response) {
            return response;
        } else {
            throw new NotFoundException(`username: ${body.username} not found`)
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN only. Get one user by id'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/id/:id')
    @ApiParam({name: 'id', type: 'string'})
    async findOneById(@Param('id') id ): Promise<User> {
        const response = await this.userService.findOneById(id);
        console.log('Response: ', response);
        if(!!response) {
            return response;
        } else {
            throw new NotFoundException(`id: ${id} not found`)
        }
    }

    @Post('/register/renter')
    @ApiOperation({summary:'No restriction. Register a RENTER'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @ApiCreatedResponse({type: RenterCreateResponseDto})
    async registerRenter(@Body() userDto: RenterCreateDto): Promise<RenterCreateResponseDto> {
        const response = await this.userService.createRenter(userDto);
        console.log('Response: ', response);
        if(response) {
            return response;
        } else {
            throw new BadRequestException(`Create for RENTER username: ${userDto.email} failed`);
        }
    }

    @UseGuards(AuthGuard('renter'))
    @ApiOperation({summary:'Renter only. Update Renter profile'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update/renter')
    async updateRenter(@Body() userDto: RenterUpdateDto, @Request() req): Promise<RenterCreateResponseDto> {
        const response = await this.userService.updateRenter(userDto, req.user);
        console.log('Response: ', response);
        if(response) {
            return response;
        } else {
            throw new BadRequestException(`Update for RENTER username: ${userDto.email} failed`);
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({summary:'Landlord only. Update Landlord profile'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update/landlord')
    async updateLandlord(@Body() userDto: LandlordUpdateDto, @Request() req): Promise<LandlordCreateResponseDto> {
        const response = await this.userService.updateLandlord(userDto, req.user);
        console.log('Response: ', response);
        if(response) {
            return response;
        } else {
            throw new BadRequestException(`Update for LANDLORD username: ${userDto.email} failed`);
        }
    }

    @UseGuards(AuthGuard('sys-admin'))
    @ApiOperation({summary:'SYS-ADMIN only. Update SysAdmin profile'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update/sysadmin')
    async updateSysAdmin(@Body() userDto: SysAdminUpdateDto, @Request() req): Promise<SysadminCreateResponseDto> {
        const response = await this.userService.updateSysAdmin(userDto, req.user);
        console.log('Response: ', response);
        if(response) {
            return response;
        } else {
            throw new BadRequestException(`Update for SysAdmin username: ${userDto.email} failed`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))

    @ApiOperation({summary:'SUPER-ADMIN only. Update SuperAdmin profile'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update/superadmin')
    async updateSuperAdmin(@Body() userDto: SysAdminUpdateDto, @Request() req): Promise<SysadminCreateResponseDto> {
        const response = await this.userService.updateSuperAdmin(userDto, req.user);
        console.log('Response: ', response);
        if(!!response) {
            return response;
        } else {
            throw new BadRequestException(`Update for SuperAdmin username: ${userDto.id} failed`);
        }
    }

    // @UseGuards(AuthGuard('super-admin'))
    @Post('/register/landlord')
    @ApiOperation({summary:'Register a LANDLORD'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @ApiCreatedResponse({type: LandlordCreateResponseDto})
    async registerLandlord(@Body() userDto: LandlordCreateDto): Promise<LandlordCreateResponseDto> {
        console.log('landlord email: ', userDto.email);
        const response = await this.userService.createLandlord(userDto);
        console.log('Response: ', response);
        if (response) {
            return response;
        } else {
            throw new BadRequestException(`Create for LANDLORD username: ${userDto.email} failed`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiExcludeEndpoint()
    @ApiOperation({summary:'SUPER-ADMIN only. Register any type of user. To be called from Dashboard'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Post('/register/user')
    async registerAnyUserType(@Body() userDto: AnyUserCreateDto): Promise<any> {
        const response = await this.userService.createAnyUser(userDto);
        console.log('Response: ', response);
        if (!!response) {
            return response;
        } else {
            throw new BadRequestException(`Create for Any User username: ${userDto.email} failed`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiExcludeEndpoint()
    @ApiOperation({summary:'SUPER-ADMIN only. Register SUPER-ADMIN & SYS-ADMIN users. To be called from Dashboard'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Post('/register/sysadmin')
    async registerSysAdminUser(@Body() userDto: SysAdminCreateDto): Promise<any> {
        const response = await this.userService.createSysAdmin(userDto);
        console.log('Response: ', response);
        if (!!response) {
            return response;
        } else {
            throw new BadRequestException(`Create for Any User username: ${userDto.email} failed`);
        }
    }

    @ApiOperation({summary:'No restrictions. Get a list of user_types'})
    @Get('/types')
    async getUserTypes() {
        const response = this.userService.getUserTypes();
        console.log('Response: ', response);
        return response;
    }

    @UseGuards(AuthGuard('user'))
    @ApiOperation({summary:'Registered Users Only. Upload Avatar'})
    @Post('/upload/avatar')
    @UseInterceptors(FileInterceptor('file',{dest: 'uploads/'}))
    async uploadMyAvatar(@UploadedFile() file, @Request() req, @Body() body: FileUploadDto) {
        try {
            const authUser = req.user;
            const userId = authUser.userId;
            const userType = authUser.user_type;
            const type = 'avatar';
            const {options} = body;
            let response = await this.userService.uploadAvatar(userId, file, type, userType, authUser, options);
            return response;
        } catch (e) {
            throw new BadRequestException(`uploadMyAvatar - ${this.processError(e)}`);
        }
    }

    @UseGuards(AuthGuard('user'))
    @ApiOperation({summary:'Registered Users Only. Upload Avatar'})
    @ApiParam({name: 'username', type: 'string'})
    @Post('/upload/avatar/:username')
    @UseInterceptors(FileInterceptor('file',{dest: 'uploads/'}))
    async uploadAvatarByUsername(@UploadedFile() file, @Param() username, @Request() req, @Body() body: AvatarFileUploadDto) {
        try {
            const userProfile = await this.userService.findOneByUsername(username.username);
            if (!userProfile) {
                throw new NotFoundException('User not found');
            } else {
                // console.log('uploadAvatarByUsername - userProfile: ', userProfile);
                const authUser = req.user;
                const userId = userProfile.id;
                const userType = userProfile.user_type;
                const type = 'avatar';
                const {options} = body;
                // console.log('uploadAvatarByUsername - params: ', {userId, type, userType});
                let response = await this.userService.uploadAvatar(userId, file, type, userType, authUser, options);
                /**
                 * @TODO: Delete file from uploads
                 */
                return response;
            }
        } catch (e) {
            throw new BadRequestException(`uploadAvatarByUsername - ${this.processError(e)}`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER_ADMIN Only. Delete user. This is a soft delete.'})
    @ApiParam({name: 'id', type: 'string'})
    @Delete('/delete/id/:id')
    async deleteUser(@Param() id, @Request() req, @Body() body): Promise<any> {
        try {
            return await this.userService.deleteUserById(id, req.user);
        } catch (e) {
            throw new BadRequestException(`deleteUser - ${this.processError(e)}`);
        }
    }

    processError(e) {
        let msg: string;
        if(typeof e.message ===  'object') {
            msg = e.message.message;
        } else {
            msg = e.message;
        }
        return msg;
    }
}

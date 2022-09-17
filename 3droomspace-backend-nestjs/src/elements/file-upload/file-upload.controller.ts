import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {
    Request,
    Response,
    Body,
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    BadRequestException, Get, NotFoundException, Param
} from '@nestjs/common';
import {AuthService} from '../../auth/auth.service';
import {AuthGuard} from '@nestjs/passport';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage'
import {FileUploadService} from './file-upload.service';
import {FileUploadDto} from '../../dtos/file-upload/fileUpload.dto';
import {UserService} from '../user/user.service';

@ApiTags('File Upload')
@ApiBearerAuth()
@Controller('/api/files')
export class FileUploadController {
    private gcpStorage;
        constructor(
        private fileService: FileUploadService,
        private userService: UserService
    ){
            this.gcpStorage = new Storage();
    }

    @UseGuards(AuthGuard('user'))
    @ApiOperation({summary:'No restrictions. General Single File Upload'})
    @Post('/upload/single')
    @UseInterceptors(FileInterceptor('file',{dest: 'uploads/'}))
    async uploadSingle(@UploadedFile() file, @Request() req, @Body() body: FileUploadDto) {
        try {
            const {id, type, options} = body;
            const mimeType = file.mimetype.split('/')[1];
            const response = await this.fileService.uploadSingleToGcp(id, file.path, type, mimeType);
            return response;
        } catch (e) {
            throw new BadRequestException(`uploadSingle - ${this.processError(e)}`);
        }
    }

    @UseGuards(AuthGuard('user'))
    @ApiOperation({summary:'No restrictions. General Multiple File Upload'})
    @Post('/upload/multi')
    @UseInterceptors(FilesInterceptor('files', 10, {dest: 'uploads/'}))
    async uploadMulti(@UploadedFiles() files,  @Request() req, @Body() body: FileUploadDto) {
        console.log(files);
        if (Array.isArray(files) && files.length > 0) {
            const {id, type, options} = body;
            const authUser = req.user;
            let imageUrls: string[] = [];
            let url: string;
            try {
                for (let f of files) {
                    const path = f.path;
                    const mimeType = f.mimetype.split('/')[1].toLowerCase();
                    if (this.fileService.validImageMimeTypes.indexOf(mimeType) === -1) {
                        throw new BadRequestException('Invalid Mime Type');
                    }
                    url = await this.fileService.uploadSingleToGcp(id, path, type, mimeType);
                    imageUrls.push(url);
                }
                /**
                 * @TODO: Delete files from uploads
                 */
                return imageUrls;
            } catch (e) {
                throw new BadRequestException(`'ERROR: uploadPhotos - msg: ${this.processError(e)}`);
            }
        } else {
            throw new BadRequestException('No files to upload');
        }
    }

    @UseGuards(AuthGuard('user'))
    @Get('/get/avatar')
    async getMyAvatarFromGcp(@Request() req) {
        let userProfile;
        try {
            const userProfileArray = await this.userService.findOneById(req.user.userId);
            console.log('getMyAvatarFromGcp - userProfile: ', userProfileArray);
            if(Array.isArray(userProfileArray) && userProfileArray.length === 1) {
                userProfile = userProfileArray[0];
            }
            if (!userProfile) {
                throw new NotFoundException('User not found');
            } else {
                // console.log('userProfile: ', userProfile);
                const signedUrl = await this.fileService.createSignedUrl(userProfile.avatar_url);
                return {signedUrl};
            }
        } catch (e) {
            throw new BadRequestException(`getMyAvatarFromGcp - Unable to retrieve Avatar: Msg: ${this.processError(e)}`)
        }
    }

    @UseGuards(AuthGuard('user'))
    @Get('/get/signed/avatar/:username')
    @ApiParam({name: 'username', type: 'string'})
    async getSignedAvatarUrl(@Param() username) {
        let userProfile: any;
        try {
            const userProfileArray = await this.userService.findOneByUsername(username.username);
            // console.log('getSignedAvatarUrl - userProfile: ', userProfileArray);
            if(Array.isArray(userProfileArray) && userProfileArray.length === 1) {
                userProfile = userProfileArray[0];
            } else {
                userProfile = userProfileArray;
            }
            if (!userProfile) {
                throw new NotFoundException('User not found');
            } else {
                // console.log('userProfile: ', userProfile);
                const signedUrl = await this.fileService.createSignedUrl(userProfile.avatar_url);
                return {signedUrl};
            }
        } catch (e) {
            throw new BadRequestException(`getSignedAvatarUrl - Unable to retrieve Avatar: Msg: ${this.processError(e)}`);
        }
    }

    @UseGuards(AuthGuard('user'))
    @Get('/get/avatar/:username')
    @ApiParam({name: 'username', type: 'string'})
    async getAnyAvatarFromGcp(@Param() username) {
        let userProfile: any;
        try {
            const userProfileArray = await this.userService.findOneByUsername(username.username);
            // console.log('getSignedAvatarUrl - userProfile: ', userProfileArray);
            if(Array.isArray(userProfileArray) && userProfileArray.length === 1) {
                userProfile = userProfileArray[0];
            }
            if (!userProfile) {
                throw new NotFoundException('User not found');
            } else {
                // console.log('userProfile: ', userProfile);
                const signedUrl = await this.fileService.createSignedUrl(userProfile.avatar_url);
                return {signedUrl};
            }
        } catch (e) {
            throw new BadRequestException(`getAnyAvatarFromGcp - Unable to retrieve Avatar: Msg: ${this.processError(e)}`);
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

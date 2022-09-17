import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileUploadService } from '../file-upload/file-upload.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Property Photos')
@ApiBearerAuth()
@Controller('/api/properties/photos')
export class PropertyPhotoController {
    constructor(
        private fileUploadService: FileUploadService
    ) { }

    @UseGuards(AuthGuard('user'))
    @ApiOperation({ summary: '' })
    @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
    @Post('/upload/single')
    async uploadPhoto(@UploadedFile() file, @Request() req, @Body() body) {
        try {
            const { propertyId } = body;
            console.log(file, body);
            const options = JSON.parse(body.options);
            console.log('options: ', options);
            const mimeType = file.mimetype.split('/')[1].toLowerCase();
            const type = 'property-photo';
            const response = await this.fileUploadService.uploadSingleToGcp(propertyId, file.path, type, mimeType);
            return response;
        } catch (e) {
            console.log('uploadPhotos - JSON: ', JSON.stringify(e));
            console.log('uploadPhotos - message: ', e.message);
            throw new BadRequestException(`uploadPhotos - ${e.message.message}`);
        }
    }

}

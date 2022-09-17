import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    BadRequestException,
    Patch,
    Param,
    NotFoundException, UseInterceptors, UploadedFiles, Query
} from '@nestjs/common';
import { PropertyService } from "./property.service";
import { AuthGuard } from "@nestjs/passport";
import { Property } from "../../entities/property.entity";
import { PropertyCreateDto } from "../../dtos/property/property-create.dto";
import { ErrorClass } from '../../classes/error.class';
import { PropertyUpdateDto } from '../../dtos/property/property-update.dto';
import { UpdateResult } from 'typeorm';
import { PostgisLocationDto } from '../../dtos/property/postgis-location.dto';
import { LandlordCreateResponseDto } from '../../dtos/landlord/landlord-create-response.dto';
import { PropertyCreateResponseDto } from '../../dtos/property/property-create-response.dto';
import { PropertyPhotoService } from '../property-photos/property-photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../../dtos/file-upload/fileUpload.dto';
import { plainToClass } from 'class-transformer';
import { PropertyPhotoUploadDto } from '../../dtos/property-photo/propertyPhotoUpload.dto';
import { Observable } from 'rxjs';
import { BoundsDto } from '../../dtos/property/bounds.dto';
import * as fs from 'fs';
import * as path from 'path'
import {randomBytes} from "crypto";

@ApiTags('Properties')
@ApiBearerAuth()
@Controller('/api/properties')
export class PropertyController {
    constructor(
        private readonly propertyService: PropertyService,
        private readonly propPhotoService: PropertyPhotoService
    ) { }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({ summary: 'SUPER-ADMIN only. Get a list of all properties' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/all')
    async findAll(): Promise<Property[]> {
        return await this.propertyService.findAll();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({ summary: 'SUPER-ADMIN only. Get a list of all properties' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @ApiParam({ type: 'string', name: 'userId' })
    @Get('/all/:userId')
    async findMyProperties(@Param('userId') userId: string): Promise<Property[]> {
        return await this.propertyService.findAll(userId);
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({ summary: 'SUPER-ADMIN only. Get list of Properties for Dropdown select' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/dropdown')
    async findAllPropsForDropdown(): Promise<any[]> {
        return await this.propertyService.findAllForDropdown();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({ summary: 'SUPER-ADMIN only. Get one of Property for Dropdown select' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @ApiParam({ name: 'id', type: 'string' })
    @Get('/dropdown/id/:id')
    async findOnePropForDropdown(@Param('id') id: string): Promise<any> {
        return await this.propertyService.findOnePropForDropdown(id);
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD only. Get list of Landlord\'s Properties for Dropdown select' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @ApiParam({ type: 'string', name: 'userId' })
    @Get('/dropdown/:userId')
    async findMyPropsForDropdown(@Param('userId') userId: string): Promise<any[]> {
        return await this.propertyService.findAllForDropdown(userId);
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD Only. Find one property by ID' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/id/:id')
    @ApiParam({ name: 'id', type: 'string' })
    async findOneById(@Param('id') id): Promise<Property> {
        try {
            const response = await this.propertyService.findOneById(id);
            if (!!response) {
                return response;
            } else {
                throw new NotFoundException(`id: ${id} not found`);
            }
        } catch (e) {
            if ((typeof e['getStatus'] === 'function') && e.getStatus() === 404) {
                throw new NotFoundException(e.message);
            } else {
                const msg = e.message;
                throw new BadRequestException(`findOneById - ${msg}`);
            }
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'Any User Type. Find all the properties inside a bounded box, Supply bounds as a set of 4 long/lat values.' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/search/location/area')
    async findAllInArea(@Query() location: BoundsDto): Promise<Property[]> {
        console.log('location: ', location);
        try {
            const response = await this.propertyService.findAllInArea(location);
            // console.log('get findAllInArea - response: ', response);
            if (!!response) {
                return response;
            } else {
                throw new NotFoundException(`location: ${JSON.stringify(location)} not found`);
            }
        } catch (e) {
            if ((typeof e['getStatus'] === 'function') && e.getStatus() === 404) {
                throw new NotFoundException(e.message);
            } else {
                const msg = e.message;
                throw new BadRequestException(`findAllInArea - ${msg}`);
            }
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD only. Register a Property' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Post('/register')
    async registerProperty(@Body() propDto: PropertyCreateDto, @Request() req): Promise<Property> {
        console.log('registerProperty - propDto: ', propDto);
        console.log('???')
        const { photos, ...prop } = propDto as any;
        const response = await this.propertyService.createProperty(prop, req.user);
        
        if (response) {
            const options = JSON.stringify({});
            photos.forEach(async (file: string) => {
                const fileName = 'uploads/' + randomBytes(16).toString('hex');
                const p = file.indexOf(",") + 1;
                await fs.writeFile(fileName, file.slice(p), 'base64', () => {});
                const f = {
                    path: fileName,
                    mimetype: 'image/jpeg'
                };
    
                await this.propPhotoService.uploadPhotos(response.id, [ f ], req.user, options);
            });

            return response;
        } else {
            throw new BadRequestException(`Create for Property: ${propDto.address.address_line1} failed`);
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD only. Update Property' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Patch('/update')
    async updateProperty(@Body() propDto: PropertyUpdateDto, @Request() req): Promise<PropertyUpdateDto> {
        const response: UpdateResult = await this.propertyService.updateProperty(propDto, req.user);
        // console.log('Response: ', response);
        if (!!response.affected) {
            return propDto;
        } else {
            throw new BadRequestException(`Update to Property ID : ${propDto.id} failed`);
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD only. General Multiple File Upload' })
    @Post('/upload/photos/multi')
    @UseInterceptors(FilesInterceptor('files', 10, { dest: 'uploads/' }))
    async uploadMulti(@UploadedFiles() files, @Request() req, @Body() body: PropertyPhotoUploadDto) {
        if (Array.isArray(files) && files.length > 0) {
            console.log('uploadMulti - file: ', files);
            const { id, options } = body;
            const authUser = req.user;
            const qtyUrls = await this.propPhotoService.uploadPhotos(id, files, authUser, options);
            console.log('uploadMulti - qtyUrls: ', qtyUrls);
            if (qtyUrls) {
                let property: Property = await this.propertyService.findOneById(id);
                property.has_photos = true;
                property.num_photos = property.num_photos + qtyUrls;
                // console.log('Property: ', property);
                const propertyUpdateDto: PropertyUpdateDto = plainToClass(PropertyUpdateDto, property);
                const response = await this.propertyService.updateProperty(propertyUpdateDto, authUser);
                console.log('uploadMulti - response: ', response);
                return response;
            }
        } else {
            throw new BadRequestException('No files to upload');
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD only. General Single Photo Upload' })
    @Post('/photos/upload/single')
    async uploadSingle(@Request() req, @Body() body: PropertyPhotoUploadDto): Promise<any> {
        const { id, options, file } = body;
        const authUser = req.user;
        const fileName = 'uploads/' + randomBytes(32).toString('hex');
        await fs.writeFile(fileName, file, 'base64', () => {});
        const f = {
            path: fileName,
            // path: path.resolve(fileName),
            mimetype: 'image/jpeg'
        };

        const urls = await this.propPhotoService.uploadPhotos(id, [ f ], authUser, options);
        if (urls.length > 0) {
            return urls[0]
        } else {
            return null
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD only. General Multiple File Upload' })
    @ApiParam({ name: 'id', type: 'string' })
    @Post('/upload/photos/multi/:id')
    @UseInterceptors(FilesInterceptor('files', 10, { dest: 'uploads/' }))
    async uploadMultiByPropId(@UploadedFiles() files, @Param('id') id, @Request() req) {
        if (Array.isArray(files) && files.length > 0) {
            console.log('uploadMulti - file: ', files);
            const authUser = req.user;
            const qtyUrls = await this.propPhotoService.uploadPhotos(id, files, authUser, null);
            console.log('uploadMulti - qtyUrls: ', qtyUrls);
            if (qtyUrls) {
                let property: Property = await this.propertyService.findOneById(id);
                property.has_photos = true;
                property.num_photos = property.num_photos + qtyUrls;
                // console.log('Property: ', property);
                const propertyUpdateDto: PropertyUpdateDto = plainToClass(PropertyUpdateDto, property);
                const response = await this.propertyService.updateProperty(propertyUpdateDto, authUser);
                console.log('uploadMulti - response: ', response);
                return response;
            }
        } else {
            throw new BadRequestException('No files to upload');
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD Only. Retrieve all photos with full record for given property' })
    @Get('/get/photos/long/:id')
    @ApiParam({ name: 'id', type: 'string' })
    async getPhotosByPropIdLong(@Param('id') id): Promise<any> {
        try {
            const photos = await this.propPhotoService.findAllByPropIdLong(id);
            if (photos) {
                return photos;
            } else {
                throw new BadRequestException(`Error getting photos for id: ${id}`);
            }
        } catch (e) {
            throw new BadRequestException(`Error getting photos for id:${id} msg: ${this.processError(e)}`);
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD Only. Retrieve all photos, url & caption only, for given property' })
    @Get('/get/photos/:id')
    @ApiParam({ name: 'id', type: 'string' })
    async getPhotosByPropIdShort(@Param('id') id): Promise<any> {
        try {
            const photos = await this.propPhotoService.findAllByPropIdShort(id);
            if (photos) {
                return photos;
            } else {
                throw new BadRequestException(`Error getting photos for id: ${id}`);
            }
        } catch (e) {
            throw new BadRequestException(`Error getting photos for id: ${this.processError(e)}`);
        }
    }

    processError(e) {
        let msg: string;
        if (typeof e.message === 'object') {
            msg = e.message.message;
        } else {
            msg = e.message;
        }
        return msg;
    }
}


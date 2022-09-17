import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {PropertyPhoto} from '../../entities/property_photo.entity';
import {plainToClass} from 'class-transformer';
import {PropertyPhotoAddDto} from '../../dtos/property-photo/property-photo-add.dto';
import {AuthUserClass} from '../../classes/authUser.class';
import {FileUploadService} from '../file-upload/file-upload.service';

@Injectable()
export class PropertyPhotoService {
    constructor(
        @Inject('PROPERTY_PHOTO_REPOSITORY')
        private readonly propertyPhotoRepository: Repository<PropertyPhoto>,
        private fileService: FileUploadService
    ){}

    async findAllByPropIdLong(id: string): Promise<PropertyPhoto[]> {
        try {
            const propPhotoList = await this.propertyPhotoRepository
                .createQueryBuilder('prop_photos')
                .where(`prop_photos.propertyId = '${id}'`)
                .orderBy({
                    "prop_photos.sort_order":'ASC'
                })
                .getRawMany();
            return propPhotoList;
        } catch (e) {
            throw new BadRequestException(`Property Photo Service - findAllByPropId - id: ${id} not found`)
        }
    }

    async findAllByPropIdShort(id: string): Promise<PropertyPhoto[]> {
        try {
            const propPhotoList = await this.propertyPhotoRepository
                .createQueryBuilder('prop_photos')
                .select(['photo_url', 'photo_caption'])
                .where(`prop_photos.propertyId = '${id}'`)
                .orderBy({
                    "prop_photos.sort_order":'ASC'
                })
                .getRawMany();
            // console.log('findAllByPropIdShort - propPhotoList: ', propPhotoList);
            return propPhotoList;
        } catch (e) {
            throw new BadRequestException(`Property Photo Service - findAllByPropId - id: ${id} not found`)
        }
    }

    async getSignedUrl(url) {
        return await this.fileService.createSignedUrl(url);
    }

    async uploadPhotos(propId, files, authUser, options): Promise<any> {
        let imageUrls: string[] = [];
        let url: string;
        let response: any;
        const optObj = (options) ? JSON.parse(options) : null;
        const captions = (optObj) ? this.convertCaptionsToArray(optObj.captions) : [];
        console.log('-------> CAPTIONS <------', captions);
        try {
            let index = 0;
            for( let f of files) {
                const path = f.path;
                const type = 'property-photo';
                const mimeType = f.mimetype.split('/')[1].toLowerCase();
                if (this.fileService.validImageMimeTypes.indexOf(mimeType) === -1) {
                    throw new BadRequestException('Invalid Mime Type');
                }
                url = await this.fileService.uploadSingleToGcp(propId, path, type, mimeType);
                imageUrls.push(url);
                let propPhotoDto = new PropertyPhotoAddDto();
                propPhotoDto.propertyId = propId;
                propPhotoDto.photo_caption = (captions[index]) ? captions[index] : '';
                propPhotoDto.photo_url = url;
                response = await this.addPhotoToProperty(propPhotoDto, authUser);
                index++;
            }
            return imageUrls.length;
        } catch (e) {
            throw new BadRequestException(`'ERROR: uploadPhotos - msg: ${this.processError(e)}`);
        }
    }

    async addPhotoToProperty(propPhotoDto: PropertyPhotoAddDto, authUser: AuthUserClass):Promise<any> {
        // console.log('propPhotoDto: ', propPhotoDto);
        let propPhoto = plainToClass(PropertyPhoto, propPhotoDto);
        propPhoto.created_by = authUser.username;
        propPhoto.created_by_uuid = authUser.userId;
        // console.log('propPhoto: ', propPhoto);
        try {
            const response = await this.propertyPhotoRepository.save(propPhoto);
            // console.log('addPhotoToProperty - save - response: ', response);
            return response;
        } catch (e) {
            const msg = e.message;
            throw new BadRequestException(`addPhotoToProperty - ${msg}`);
        }
    }

    convertCaptionsToArray(captions): string[] {
        if(!captions) {
            return [];
        } else {
            if(Array.isArray(captions)) {
                return captions
            } else {
                const captionsArray = captions.split('|~|').map((cap: string) => cap.trim());
                console.log('captionsArray: ', captionsArray);
                return captionsArray;
            }
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

import {BadRequestException, Injectable} from '@nestjs/common';
import {GetSignedUrlConfig, Storage} from '@google-cloud/storage';


@Injectable()
export class FileUploadService {
    private gcpStorage:Storage;
    private bucket = '3drs-2020-images';
    public validImageMimeTypes = ['jpeg', 'png'];
    public validDocumentMimeTypes = ['pdf'];
    constructor(
    ){
        this.gcpStorage = new Storage();
    }

    getFilenameFromUrl(url: string) {
        const urlParts = url.split('/');
        const bucket = urlParts.shift();
        return {bucket, fileName: urlParts.join('/')}
    }

    async createSignedUrl(imageUrl: string) {
        if (!imageUrl) {
            return './assets/img/demo/authors/blank-person.png';
        } else {
            // console.log('createSignedUrl - imageUrl: ', imageUrl);
            const {bucket, fileName} = this.getFilenameFromUrl(imageUrl);
            // console.log('createSignedUrl ------> Bucket <-------: ', bucket);
            // console.log('createSignedUrl - fileName: ', fileName);
            const options:GetSignedUrlConfig = {
                version: 'v4',
                action: 'read',
                expires: Date.now() + 8640000 // 1 day of milliseconds
            };
            const signedUrl = await this.gcpStorage.bucket(bucket).file(fileName).getSignedUrl(options);
            // console.log('=======> createSignedUrl <====== : ', signedUrl[0]);
            return signedUrl[0];
        }
    }

    async uploadSingleToGcp(id: string, srcFilename: string, type: string, mimeType: string) {
        try {
            switch (type) {
                case 'avatar':
                    break;
                case 'property-photo':

                    break;
                default:
                    throw new BadRequestException(`uploadToGcp - invalid type: ${type}`)
            }
            const destFile = `${id}.${type}.${srcFilename}.${mimeType}`;
            let response;
            response = await this.gcpStorage.bucket(this.bucket).upload(srcFilename, {destination: destFile, });
            // console.log('gcpStorage - response: ', response);
            const url = this.buildUrl(response[0].metadata);
            console.log('Url: ', url);
            return url;
        } catch (e) {
            let msg: string;
            if(typeof e.message ===  'object') {
                msg = e.message.message;
            } else {
                msg = e.message;
            }
            throw new BadRequestException(`uploadToGcp - ${msg}`);
        }
    }

    buildUrl(meta) {
        const fileIdParts = meta.id.split('/');
        fileIdParts.pop(); // drop off the last element, weird timestamp
        const url = `${fileIdParts.join('/')}`;
        return url;
    }
}

import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class PropertyPhotoAddDto {
    @ApiProperty()
    @IsNotEmpty()
    propertyId: string;

    @ApiProperty()
    @IsNotEmpty()
    photo_url: string;

    @ApiProperty({default: 'this is a caption'})
    @IsOptional()
    photo_caption: string;

    @ApiProperty()
    @IsOptional()
    options: any;

}

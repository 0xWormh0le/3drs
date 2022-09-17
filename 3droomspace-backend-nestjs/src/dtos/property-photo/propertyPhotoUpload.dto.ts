import {ApiProperty} from '@nestjs/swagger';
import {IsIn, IsNotEmpty, IsOptional} from 'class-validator';

export class PropertyPhotoUploadDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsOptional()
    options: any;

    @ApiProperty()
    @IsOptional()
    file: any;
}

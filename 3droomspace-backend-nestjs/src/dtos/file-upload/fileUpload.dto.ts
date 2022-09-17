import {ApiProperty} from '@nestjs/swagger';
import {IsIn, IsNotEmpty, IsOptional} from 'class-validator';

export class FileUploadDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['avatar', 'property-photo'])
    type: string;

    @ApiProperty()
    @IsOptional()
    options: any;
}

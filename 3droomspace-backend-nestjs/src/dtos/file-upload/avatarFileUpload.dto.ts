import {ApiProperty} from '@nestjs/swagger';
import {IsIn, IsNotEmpty, IsOptional} from 'class-validator';

export class AvatarFileUploadDto {
    @ApiProperty()
    @IsOptional()
    options: any;
}

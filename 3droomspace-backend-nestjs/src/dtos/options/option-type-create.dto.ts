import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class OptionTypeCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string
}

import {ApiProperty} from '@nestjs/swagger';

export class ErrorClass {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    error: string;
    @ApiProperty()
    message: string;
}

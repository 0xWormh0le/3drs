import {ApiProperty} from '@nestjs/swagger';

export class LifestyleClass {
    @ApiProperty({default: false})
    smoking: boolean;

}

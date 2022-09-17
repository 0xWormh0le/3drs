import {ApiProperty} from '@nestjs/swagger';

export class PropertyDropdownItemDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    addressLine: string;
}

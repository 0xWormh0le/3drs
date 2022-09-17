import {ApiProperty} from '@nestjs/swagger';

export class AddressClass {
    @ApiProperty()
    address_line1: string;

    @ApiProperty()
    address_line2: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    postal_code: string;
}

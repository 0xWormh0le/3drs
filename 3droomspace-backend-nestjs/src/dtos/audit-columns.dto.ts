import {ApiProperty} from '@nestjs/swagger';

export class AuditColumnsDto {
    @ApiProperty()
    created_by: string;
    @ApiProperty()
    created_date: Date;
    @ApiProperty()
    updated_by: string;
    @ApiProperty()
    updated_date: Date;
    @ApiProperty()
    deleted_by: string;
    @ApiProperty()
    deleted_date: Date;
    @ApiProperty()
    active: boolean;
}

import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from 'class-validator';

export class ListingUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsOptional()
    propertyId: string;

    @ApiProperty()
    @IsOptional()
    listingAgentId: string;

    @ApiProperty()
    listing_date: Date;

    @ApiProperty()
    status: string;

    @ApiProperty()
    viewing: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    lease_period_min: number;

    @ApiProperty()
    lease_period_max: number;

    @ApiProperty()
    sublet_ok: boolean;

    @ApiProperty()
    max_occupancy: number;

    @ApiProperty()
    pets_allowed: boolean;

    @ApiProperty()
    pet_restrictions: string;

    @ApiProperty()
    date_available: Date;

    @ApiProperty()
    listing_agent_name: string;

    @ApiProperty()
    wifi_available: boolean;

    @ApiProperty()
    marijuana_ok: boolean;

    @ApiProperty()
    alcohol_ok: boolean;

    @ApiProperty()
    smoking_ok: boolean;

    @ApiProperty()
    furnished: boolean;

}

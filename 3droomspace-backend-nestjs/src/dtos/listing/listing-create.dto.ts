import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ListingCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    propertyId: string;

    @ApiProperty()
    @IsNotEmpty()
    listingAgentId: string;

    @ApiProperty()
    listing_date: Date;

    @ApiProperty()
    status: string;

    @ApiProperty()
    summary: string;

    @ApiProperty()
    description: string;

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
    active: boolean;

    @ApiProperty()
    publish_up_date: Date;

    @ApiProperty()
    publish_down_date: Date;
}

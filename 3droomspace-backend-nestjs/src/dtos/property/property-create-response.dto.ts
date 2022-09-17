import {AddressDto} from './address.dto';
import {ApiProperty} from '@nestjs/swagger';

export class PropertyCreateResponseDto {
    @ApiProperty()
    id: string;

	@ApiProperty()
    prop_mgmt_co_fk: string;

	@ApiProperty()
    prop_manager_fk: string;

	@ApiProperty()
   city: string;

	@ApiProperty()
    state: string;

	@ApiProperty()
    postal_code: string;

	@ApiProperty()
    description: string;

	@ApiProperty()
    bedrooms: number;

	@ApiProperty()
    bathrooms: number;

	@ApiProperty()
    property_type: string;

	@ApiProperty()
    property_status: string;

	@ApiProperty()
    size_sq_ft: number;

	@ApiProperty()
    num_units: number;

	@ApiProperty()
    address: AddressDto;

	@ApiProperty()
    created_by: string;

	@ApiProperty()
    county: string;

	@ApiProperty()
    country_code_2: string;

	@ApiProperty()
    country_code_3: string;

	@ApiProperty()
    country_code_un: string;

	@ApiProperty()
    parking: string;

	@ApiProperty()
    parking_type: string;

	@ApiProperty()
    heating: string;

	@ApiProperty()
    cooling: string;

	@ApiProperty()
    laundry: string;

	@ApiProperty()
    coords: string;

	@ApiProperty()
    latitude: string;

	@ApiProperty()
    longitude: string;

	@ApiProperty()
    created_date: Date;

	@ApiProperty()
    parking_num_spaces: number;

	@ApiProperty()
    accessible: boolean;

	@ApiProperty()
    has_photos: boolean;

	@ApiProperty()
    num_photos: number;

	@ApiProperty()
    has_floorplan: boolean;

	@ApiProperty()
    has_3d: boolean;

}

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Property } from "../../entities/property.entity";
import { PropertyCreateDto } from "../../dtos/property/property-create.dto";
import { classToPlain, plainToClass, serialize } from 'class-transformer';
import { AddressDto } from "../../dtos/property/address.dto";
import { PropertyCreateResponseDto } from '../../dtos/property/property-create-response.dto';
import { PropertyUpdateDto } from '../../dtos/property/property-update.dto';
import { AuthUserClass } from '../../classes/authUser.class';
import { Client } from '@googlemaps/google-maps-services-js';
import { PostgisLocationDto } from '../../dtos/property/postgis-location.dto';
import { PropertyPhotoService } from '../property-photos/property-photo.service';
import { PropertyDropdownItemDto } from '../../dtos/property/property-dropdown-item.dto';
import * as utils from '../../helpers/utils';
import { BoundsDto } from '../../dtos/property/bounds.dto';

@Injectable()
export class PropertyService {
    private gMapClient = new Client({});
    private alias = 'prop';
    constructor(
        @Inject('PROPERTY_REPOSITORY')
        private readonly propertyRepository: Repository<Property>,
        private readonly propPhotoService: PropertyPhotoService,
    ) { }

    async findAll(userId: string = null): Promise<any> {
        const whereClause = (userId !== null) ? `"userId" = '${userId}'` : '';
        const propertyListRaw = await this.propertyRepository
            .createQueryBuilder(this.alias)
            .where(whereClause)
            .orderBy({
                'postal_code': 'ASC'
            })
            .getRawMany();
        let propList = [];
        // console.log('findAll - propertyListRaw: ', propertyListRaw);
        if (Array.isArray(propertyListRaw) && propertyListRaw.length > 0) {
            propList = await this.cleanPropertyList(this.alias, propertyListRaw, true);
        }
        // console.log('findAll - propList: ', propList);
        return propList;
    }

    async findAllForDropdown(userId: string = null): Promise<PropertyDropdownItemDto[]> {
        let whereClause = `active = true and published = true `;
        if (userId !== null) {
            whereClause += ` and "userId" = '${userId}'`;
        }
        const propertyListRaw = await this.propertyRepository
            .createQueryBuilder(this.alias)
            .select(['id', 'address'])
            .where(whereClause)
            .orderBy({
                'postal_code': 'ASC',
            })
            .getRawMany();
        let propList = [];
        // console.log('findAllForDropdown - propertyListRaw: ', propertyListRaw);
        if (Array.isArray(propertyListRaw) && propertyListRaw.length > 0) {
            propList = await this.cleanPropertyList(this.alias, propertyListRaw, false, true, true);
        }
        return propList;
    }

    async findOnePropForDropdown(id: string): Promise<PropertyDropdownItemDto> {
        const whereClause = `id = '${id}'`;
        const propertyRaw = await this.propertyRepository
            .createQueryBuilder(this.alias)
            .select(['id', 'address'])
            .where(whereClause)
            .getRawOne()
        const propArray = await this.cleanPropertyList(this.alias, [propertyRaw], false, true, true);
        return propArray[0];
    }

    async findOneById(id: string): Promise<Property | undefined> {
        return await this.propertyRepository.findOne(id);
    }

    async createProperty(propDto: PropertyCreateDto, authUser: AuthUserClass): Promise<Property> {
        console.log('createProperty - propDto: ', propDto);
        const { addrObj } = await this.handleAddress('create', propDto);
        console.log('createProperty - addrObj: ', addrObj);
        if (await this.findOneByAddress(addrObj)) {
            throw new BadRequestException('Property already exists');
        }

        if (!propDto.userId) {
            propDto.userId = authUser.userId;
        }

        let propObj = plainToClass(Property, propDto);
        // let propObj: Partial<Property> = JSON.parse(serialize(propDto));

        console.log('sdada', propObj)
        // propObj.address = addrObj;
        console.log('kkkkk', authUser)
        propObj.created_by = authUser?.username;
        propObj.created_by_uuid = authUser?.userId;
        console.log('XXASDASD')
        const { longitude, latitude, county, state, country_code_2 } = await this.geoLocate(addrObj);

        propObj.longitude = longitude.slice(0, 15);
        propObj.latitude = latitude.slice(0, 15);
        // @ts-ignore
        propObj.coords = { lat: propObj.latitude, long: propObj.longitude };
        propObj.county = county;
        propObj.city = addrObj.city;
        propObj.state = (addrObj.state) ? addrObj.state : state;
        propObj.postal_code = addrObj.postal_code;
        propObj.country_code_2 = country_code_2;
        console.log('createProperty - propObj: ', propObj);
        try {
            const response = await this.propertyRepository.save(propObj);
            return this.cleanPropertyList(this.alias, [response], true, true)
                .then((value: Property[]) => {
                    return value[0];
                });
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message)
        }
    }

    async updateProperty(propDto: PropertyUpdateDto, authUser: AuthUserClass): Promise<UpdateResult> {
        try {
            const { addrObj, changed } = await this.handleAddress('update', propDto);
            let propObj = plainToClass(Property, propDto);
            if (changed) {
                propObj.address = addrObj;
                propObj.city = addrObj.city;
                propObj.state = addrObj.state;
                propObj.postal_code = addrObj.postal_code;
                const { longitude, latitude, county, country_code_2 } = await this.geoLocate(addrObj);
                propObj.longitude = longitude.slice(0, 15);
                propObj.latitude = latitude.slice(0, 15);
                // @ts-ignore
                propObj.coords = { lat: propObj.latitude, long: propObj.longitude };
                propObj.county = county;
                propObj.country_code_2 = country_code_2;
                // console.log('updateProperty - propObj: ', propObj);
            }
            propObj.updated_date = new Date();
            propObj.updated_by = authUser.username;
            propObj.updated_by_uuid = authUser.userId;

            return await this.propertyRepository.update({ id: propDto.id }, propObj);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async findOneByLocation(loc: PostgisLocationDto): Promise<any | null> {
        console.log('findOneByLocation - loc: ', loc);
        const whereClause = `ST_AsGeoJSON("coords")::json::text =  '${JSON.stringify(loc)}'::json::text`;
        const response = await this.propertyRepository
            .createQueryBuilder(this.alias)
            .where(whereClause)
            .getOne();
        if (response) {
            const propArray = await this.cleanPropertyList(this.alias, [response], true);
            return propArray[0];
        } else {
            return null;
        }
    }

    async findAllInArea(bounds: BoundsDto): Promise<any[]> {
        const { lngW, latS, lngE, latN } = bounds;
        const whereClause = `ST_Intersects(ST_Transform(coords::geometry, 4326), ST_MakeEnvelope(${lngW}, ${latS}, ${lngE}, ${latN}, 4326))`;

        const response = await this.propertyRepository
            .createQueryBuilder(this.alias)
            .leftJoinAndSelect(`prop.listings`, "listings")
            .where(whereClause)
            .getMany();


        if (response) {
            // console.log('service findAllInArea - response: ', response);
            return this.cleanPropertyList(this.alias, response, true, true);
        } else {
            return [];
        }
    }

    async findOneByAddress(addrObj): Promise<any | null> {
        const addrObjStr = JSON.stringify(addrObj);
        const whereClause = `address::json::text ~~* ('${addrObjStr}')::json::text`;
        const response = await this.propertyRepository
            .createQueryBuilder('Property')
            .where(whereClause)
            .getOne();
        if (response) {
            return this.cleanPropertyList(this.alias, [response], true);
        } else {
            return null;
        }
    }

    cleanResponse(response) {
        delete response.created_by_uuid;
        delete response.updated_by;
        delete response.updated_by_uuid;
        delete response.updated_date;
        delete response.deleted_by;
        delete response.deleted_by_uuid;
        delete response.deleted_date;
        delete response.soft_delete;
    }

    async handleAddress(type, propDto) {
        let changed = false;
        let addrObj: AddressDto;
        let newAddrObj: AddressDto = propDto.address;
        if (newAddrObj !== undefined) {
            if (type === 'create') {
                addrObj = newAddrObj;
                changed = true;
            } else if (type === 'update') {
                try {
                    const oldProp = await this.propertyRepository.findOne(propDto.id);
                    if (oldProp === undefined) {
                        throw new NotFoundException(`Error getting property with id: ${propDto.id}`);
                    } else {
                        // console.log('handleAddress - oldProp: ', oldProp);
                        addrObj = oldProp.address;
                        // console.log('handleAddress - addrObj: ', addrObj);
                        // console.log('handleAddress - typeof addrObj: ', typeof addrObj);
                        console.log('newAddrObj Keys :', Object.keys(newAddrObj));
                        console.log('addrObj    Keys :', Object.keys(addrObj));
                        Object.keys(newAddrObj).forEach(key => {
                            changed = true;
                            addrObj[key] = newAddrObj[key];
                        });
                    }
                } catch (e) {
                    if ((typeof e['getStatus'] === 'function') && e.getStatus() === 404) {
                        throw new NotFoundException(e.message);
                    } else {
                        const msg = e.message;
                        throw new BadRequestException(`Problem with getting old address for update: ${msg}`);
                    }
                }
            } else {
                throw new BadRequestException('Invalid action type for address handler');
            }
        }
        return { changed, addrObj }
    }

    async geoLocate(addrObj) {
        console.log('XX')
        let longitude = null;
        let latitude = null;
        let county = null;
        let state = null;
        let country_code_2 = null;
        const params = { address: `${addrObj.address_line1}, ${addrObj.city}, ${addrObj.state}, ${addrObj.postal_code}`, key: process.env.GOOGLE_MAPS_API_KEY };

        const locationResponse = await this.gMapClient.geocode({ params }).catch(console.log);
        console.log('??')
        if (locationResponse && locationResponse.data.status === 'OK') {
            const locationData = locationResponse && locationResponse.data.results[0];
            // console.log('geoLocate - locationData: ', JSON.stringify(locationData));
            longitude = locationData.geometry.location.lng.toString();
            latitude = locationData.geometry.location.lat.toString();
            locationData.address_components.forEach(item => {
                if (item.types[0] === 'administrative_area_level_2') {
                    county = item.long_name;
                }
                if (item.types[0] === 'administrative_area_level_1') {
                    state = item.short_name;
                }
                if (item.types[0] === 'country') {
                    country_code_2 = item.short_name;
                }
            });
        }
        return { longitude, latitude, county, state, country_code_2 }
    }

    async cleanPropertyList(alias: string, propertyList: any[], addPhotos: boolean = false, removeAudit: boolean = false, addressLineOnly: boolean = false): Promise<any[]> {
        // console.log('cleanPropertyList - propertyList: ', propertyList);
        return Promise.all(propertyList.map(async (prop: any) => {
            prop = utils.renameKeys(alias, prop);
            // console.log('cleanPropertyList - prop - after: ', prop);
            if (removeAudit) {
                this.cleanResponse(prop);
            }
            if (addPhotos) {
                let photos = await this.propPhotoService.findAllByPropIdShort(prop.id);
                // console.log(`cleanPropertyList id: ${prop.id} - photos(1): `, photos);
                if (photos && Array.isArray(photos) && photos.length > 0) {
                    prop.photos = await this.addPhotos(photos);
                    // console.log(`cleanPropertyList id: ${prop.id} - photos(2): `, prop.photos);
                } else {
                    // console.log(`cleanPropertyList id: ${prop.id} - photos(3)`);
                    prop.photos = [];
                }
            }
            if (addressLineOnly) {
                const addrObj = prop.address;
                const propObj = { id: prop.id, addressLine: addrObj.address_line1 };
                return propObj;
            }
            return prop;
        }));
    }

    async addPhotos(photos: any[]): Promise<string[]> {
        return Promise.all(photos.map(async (photo) => {
            // console.log('addPhotos - photo: ', photo);
            photo.photo_url = await this.propPhotoService.getSignedUrl(photo.photo_url);
            return photo;
        }))
    }

}

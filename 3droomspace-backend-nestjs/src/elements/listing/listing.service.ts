import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Listing } from "../../entities/listing.entity";
import { Choice } from "../../entities/property.entity";
import { ListingCreateDto } from "../../dtos/listing/listing-create.dto";
import { plainToClass } from "class-transformer";
import { AuthUserClass } from '../../classes/authUser.class';
import { ListingUpdateDto } from '../../dtos/listing/listing-update.dto';
import { BoundsDto } from '../../dtos/property/bounds.dto';

@Injectable()
export class ListingService {
    private alias = 'listing';

    constructor(
        @Inject('LISTING_REPOSITORY')
        private readonly listingRepository: Repository<Listing>
    ) { }

    async findAll(): Promise<any> {
        const listingList = await this.listingRepository.find({});
        return listingList;
    }

    async findOnById(id: string): Promise<Listing | undefined> {
        return await this.listingRepository.findOne(id);
    }

    async findAllInArea(bounds: BoundsDto): Promise<any[]> {
        const { lngW, latS, lngE, latN } = bounds;
        const whereClause =
            `ST_Intersects(ST_Transform(property.coords::geometry, 4326), ST_MakeEnvelope(${lngW}, ${latS}, ${lngE}, ${latN}, 4326)) AND
            listing.status = '${Choice.property_status.Available}'`;
        const response = await this.listingRepository
            .createQueryBuilder(this.alias)
            .leftJoinAndSelect(`${this.alias}.property`, "property")
            .where(whereClause)
            .getMany();
        return response.map((listing: Listing) => {
            const val = listing.excludeAudits();
            val.property = listing.property.includeOnly('coords');
            return val;
        });
    }

    async findMyListings(userId: string): Promise<Listing[] | undefined> {
        const response = await this.listingRepository.find({
            where: {
                listingAgentFkId: userId
            },
            cache: false
        });
        if (response.length > 0) {
            return response;
        } else {
            return null;
        }
    }

    async createListing(listingDto: ListingCreateDto, authUser: AuthUserClass): Promise<any> {
        const listingObj = plainToClass(Listing, listingDto);
        listingObj.created_by = authUser.username;
        listingObj.created_by_uuid = authUser.userId;
        if (!listingObj.listingAgentId) {
            listingObj.listingAgentId = authUser.userId;
            listingObj.listing_agent_name = authUser.username;
        }
        const response = await this.listingRepository.save(listingObj);
        console.log('Create Property Response: ', response);
        return response;
    }

    async updateListing(listingDto: ListingUpdateDto, authUser: AuthUserClass): Promise<any> {
        const listingObj = plainToClass(Listing, listingDto);
        listingObj.updated_by = authUser.username;
        listingObj.updated_by_uuid = authUser.userId;
        listingObj.updated_date = new Date();
        try {
            return await this.listingRepository.update({ id: listingDto.id }, listingObj);
        } catch (e) {
            throw new BadRequestException(`Failed updating listing with id: ${listingDto.id}`);
        }
    }

}

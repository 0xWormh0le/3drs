import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param, Patch,
    Post,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { PropertyService } from '../property/property.service';
import { ListingService } from './listing.service';
import { AuthGuard } from '@nestjs/passport';
import { BoundsDto } from '../../dtos/property/bounds.dto';
import { Listing } from '../../entities/listing.entity';
import { ErrorClass } from '../../classes/error.class';
import { ListingCreateDto } from '../../dtos/listing/listing-create.dto';
import { ListingUpdateDto } from '../../dtos/listing/listing-update.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('Listings')
@ApiBearerAuth()
@Controller('/api/listings')
export class ListingController {
    constructor(
        private readonly propertyService: PropertyService,
        private readonly listingService: ListingService
    ) { }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({ summary: 'SUPER-ADMIN only. Get a list of all listings' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/all')
    async findAll(): Promise<Listing[]> {
        return await this.listingService.findAll();
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD Only. Find one listing by ID' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/id/:id')
    @ApiParam({ name: 'id', type: 'string' })
    async findOneById(@Param('id') id: string): Promise<Listing> {
        try {
            const response = await this.listingService.findOnById(id);
            if (!!response) {
                return response;
            } else {
                throw new NotFoundException(`id: ${id} not found`);
            }
        } catch (e) {
            if ((typeof e['getStatus'] === 'function') && e.getStatus() === 404) {
                throw new NotFoundException(e.message);
            } else {
                const msg = e.message;
                throw new BadRequestException(`findOneById - ${msg}`);
            }
        }
    }

    // @UseGuards(AuthGuard('search'))
    @ApiOperation({ summary: 'Any user type. Find all the listings whose listing status is set `Available` inside a bounded box, Supply bounds as a set of 4 long/lat values.' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Get('/search/location/area')
    async findAllInArea(@Query() location: BoundsDto): Promise<Listing[]> {
        const response = await this.listingService.findAllInArea(location);
        return response
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD Only. Create a Listing' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Post('/create')
    async createListing(@Body() listingDto: ListingCreateDto, @Request() req): Promise<any> {
        try {
            const response = await this.listingService.createListing(listingDto, req.user);
            if (response) {
                return response
            } else {
                throw new BadRequestException(`Create for Listing: ${listingDto.propertyId} failed`);
            }
        } catch (e) {
            throw new BadRequestException(`Error creating listing - msg: ${this.processError(e)} `)
        }
    }

    @UseGuards(AuthGuard('landlord'))
    @ApiOperation({ summary: 'LANDLORD Only. Update a listing' })
    @ApiUnauthorizedResponse({ type: ErrorClass })
    @Patch('/update')
    async updateListing(@Body() listingDto: ListingUpdateDto, @Request() req): Promise<any> {
        const response: UpdateResult = await this.listingService.updateListing(listingDto, req.user);
        console.log('updateListing - response: ', response);
        if (!!response.affected) {
            return listingDto;
        } else {
            throw new BadRequestException(`Error updating listing. ID: ${listingDto.id}`);
        }
    }

    processError(e) {
        let msg: string;
        if (typeof e.message === 'object') {
            msg = e.message.message;
        } else {
            msg = e.message;
        }
        return msg;
    }
}

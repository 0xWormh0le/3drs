import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import {OptionsService} from './options.service';
import {AuthGuard} from '@nestjs/passport';
import {ErrorClass} from '../../classes/error.class';
import {OptionTypeCreateDto} from '../../dtos/options/option-type-create.dto';
import {OptionTypeCreateResponseDto} from '../../dtos/options/option-type-create-response.dto';
import {OptionValueCreateDto} from '../../dtos/options/option-value-create.dto';
import {OptionValueCreateResponseDto} from '../../dtos/options/option-value-create-response.dto';
import {OptionTypeUpdateDto} from '../../dtos/options/option-type-update.dto';
import {OptionValueUpdateDto} from '../../dtos/options/option-value-update.dto';

@ApiTags('Options')
@ApiBearerAuth()
@Controller('/api/options')
export class OptionsController {
    constructor(
        private optionsService: OptionsService
    ){}

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN Only. Get Options List for Dashboard '})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Get('/all')
    async getAll(): Promise<any[]> {
        return await this.optionsService.findForDataGrid();
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN Only. Get Options for specified type'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @ApiParam({name: 'optType', type: 'string'})
    @Get('/type/:optType')
    async getOptionsForType(@Param('optType') optType): Promise<any> {
        console.log('optType: ', optType);
        try {
            const response = await this.optionsService.getOptionsForType(optType);
            if (response) {
                return response;
            } else {
                throw new NotFoundException(`Option Type ${optType} not found`)
            }
        } catch (e) {
            if((typeof e['getStatus'] === 'function') && e.getStatus() === 404) {
                throw new NotFoundException(e.message);
            } else {
                const msg = e.message;
                throw new BadRequestException(`findOneById - ${msg}`);
            }
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN Only. Get Options for specified type'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @ApiParam({name: 'optType', type: 'string'})
    @Get('/value/:optType/:optKey')
    async getOptionBySlug(@Param('optType') optType, @Param('optKey') optKey): Promise<any> {
        console.log('optType: ', optType);
        try {
            const response = await this.optionsService.getOptionBySlug(optType, optKey);
            if (response) {
                return response;
            } else {
                throw new NotFoundException(`Option Type ${optType} not found`)
            }
        } catch (e) {
            if((typeof e['getStatus'] === 'function') && e.getStatus() === 404) {
                throw new NotFoundException(e.message);
            } else {
                const msg = e.message;
                throw new BadRequestException(`findOneById - ${msg}`);
            }
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN only. Create Option Type for Dashboard'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Post('/create/type')
    async createOptionType(@Body() typeDto: OptionTypeCreateDto): Promise<OptionTypeCreateResponseDto> {
        try {
            const response = await this.optionsService.createOptionType(typeDto);
            if(response) {
                return response;
            } else {
                throw new BadRequestException(`createOptionType Null response`);
            }
        } catch (e) {
            throw new BadRequestException(`Error Creating Option Type. Msg: ${e.message}`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN only. Update Option Type for Dashboard'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update/type')
    async updateOptionType(@Body() typeDto: OptionTypeUpdateDto): Promise<any> {
        try {
            const response = await this.optionsService.updateOptionType(typeDto);
            if (!!response.affected) {
                return typeDto;
            } else {
                throw new BadRequestException(`Error Updating Option Type ID: ${typeDto.id}`);
            }
        } catch (e) {
            throw new BadRequestException(`Error Updating Option Type. Msg: ${e.message}`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN only. Create Option Type for Dashboard'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Post('/create/value')
    async createOptionValue(@Body() valueDto: OptionValueCreateDto): Promise<OptionValueCreateResponseDto> {
        try {
            const response = await this.optionsService.createOptionValue(valueDto);
            if(response) {
                return response;
            } else {
                throw new BadRequestException(`createOptionValue Null response`);
            }
        } catch (e) {
            throw new BadRequestException(`Error Creating Option Value. Msg: ${e.message}`);
        }
    }

    @UseGuards(AuthGuard('super-admin'))
    @ApiOperation({summary:'SUPER-ADMIN only. Update Option Type for Dashboard'})
    @ApiUnauthorizedResponse({type: ErrorClass})
    @Patch('/update/value')
    async updateOptionValue(@Body() typeDto: OptionValueUpdateDto): Promise<any> {
        try {
            const response = await this.optionsService.updateOptionValue(typeDto);
            if (!!response.affected) {
                return typeDto;
            } else {
                throw new BadRequestException(`Error Updating Option Value ID: ${typeDto.id}`);
            }
        } catch (e) {
            throw new BadRequestException(`Error Updating Option Value. Msg: ${e.message}`);
        }
    }

}

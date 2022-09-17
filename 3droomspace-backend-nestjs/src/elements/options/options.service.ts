import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {OptionType} from '../../entities/option_types.entity';
import {Repository} from 'typeorm';
import {Option} from '../../entities/options.entity';
import {OptionListResponseDto} from '../../dtos/options/option-list-response.dto';
import {OptionTypeCreateDto} from '../../dtos/options/option-type-create.dto';
import {OptionTypeCreateResponseDto} from '../../dtos/options/option-type-create-response.dto';
import {plainToClass} from 'class-transformer';
import {OptionValueCreateDto} from '../../dtos/options/option-value-create.dto';
import {OptionValueCreateResponseDto} from '../../dtos/options/option-value-create-response.dto';
import {OptionTypeUpdateDto} from '../../dtos/options/option-type-update.dto';
import {OptionValueUpdateDto} from '../../dtos/options/option-value-update.dto';

@Injectable()
export class OptionsService {

    constructor(
        @Inject('OPTION_TYPE_REPOSITORY')
        private readonly optionTypeRepository: Repository<OptionType>,
        @Inject('OPTIONS_REPOSITORY')
        private readonly optionValueRepository: Repository<Option>
    ){}

    async findAllOptionTypes(): Promise<any> {
        const optionTypesList = await this.optionTypeRepository.find({});
        return optionTypesList;
    }

    async findForDataGrid(): Promise<OptionListResponseDto[]> {
        const optionsList = await this.optionTypeRepository
            .createQueryBuilder('opt_types')
            .leftJoinAndSelect('opt_types.options', 'options')
            .orderBy({
                "opt_types.name" : 'ASC',
                "options.sort_order":'ASC'
            })
            .getMany();
        return optionsList;
    }
    
    async getOptionsForType(optType: string): Promise<any[]> {
        const slug = optType.toLowerCase().replace(' ', '-');
        try {
            const optionsList = await this.optionTypeRepository
                .createQueryBuilder('opt_types')
                .select(['options.key as key', 'options.value as value'])
                .where(`opt_types.slug = '${slug}'`)
                .leftJoin('opt_types.options', 'options')
                .orderBy({
                    "options.sort_order":'ASC'
                })
                .getRawMany();
            // console.log('getOptionsForType - optionsList: ', optionsList);
            return optionsList;
        } catch (e) {
            throw new BadRequestException(`ERROR: Option Type not found. ${optType} - ${slug}`);
        }
    }

    async getOptionBySlug(optType: string, optKey: string): Promise<any> {
        const slug = optType.toLowerCase().replace(' ', '-');
        const key = optKey.toLowerCase();
        try {
            const option = await this.optionTypeRepository
                .createQueryBuilder('opt_types')
                .select(['options.key as key', 'options.value as value'])
                .where(`opt_types.slug = '${slug}' and lower(options.key) = '${optKey}'`)
                .leftJoin('opt_types.options', 'options')
                .orderBy({
                    "options.sort_order":'ASC'
                })
                .getRawOne();
            console.log('getOptionBySlug - option: ', option);
            return option;
        } catch (e) {
            throw new BadRequestException(`ERROR: Option Type not found. ${optType} - ${slug}`);
        }
    }

    async createOptionType(typeDto: OptionTypeCreateDto): Promise<OptionTypeCreateResponseDto> {
        try {
            const typeObj = plainToClass(OptionType, typeDto);
            typeObj.slug = typeObj.name.toLowerCase().replace(' ', '-');
            const response = await this.optionTypeRepository.save(typeObj);
            return response;
        } catch (e) {
            throw new BadRequestException(`Error creating Option Type. Msg: ${e.message}`);
        }
    }

    async updateOptionType(typeDto: OptionTypeUpdateDto): Promise<any> {
        try {
            const typeObj = plainToClass(OptionType, typeDto);
            typeObj.slug = typeObj.name.toLowerCase().replace(' ', '-');
            const response = await this.optionTypeRepository.update(typeDto.id, typeObj);
            return response;
        } catch (e) {
            throw new BadRequestException(`Error updating Option Type. Msg: ${e.message}`);
        }
    }

    async createOptionValue(valueDto: OptionValueCreateDto): Promise<OptionValueCreateResponseDto> {
        try {
            const valueObj = plainToClass(Option, valueDto);
            valueObj.key = valueObj.key.toLowerCase().replace(' ', '-');
            const response = await this.optionValueRepository.save(valueObj);
            return response;
        } catch (e) {
            throw new BadRequestException(`Error creating Option Value. Msg: ${e.message}`);
        }
    }

    async updateOptionValue(valueDto: OptionValueUpdateDto): Promise<any> {
        try {
            const valueObj = plainToClass(Option, valueDto);
            valueObj.key = valueObj.key.toLowerCase().replace(' ', '-');
            const response = await this.optionValueRepository.update(valueDto.id, valueObj);
            return response;
        } catch (e) {
            throw new BadRequestException(`Error updating Option Value. Msg: ${e.message}`);
        }
    }
}

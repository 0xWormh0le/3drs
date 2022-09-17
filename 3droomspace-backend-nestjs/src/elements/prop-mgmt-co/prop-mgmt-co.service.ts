import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {Raw, Repository} from "typeorm";
import {PropMgmtCo} from "../../entities/prop_mgmt_co.entity";
import {classToPlain, plainToClass} from "class-transformer";
import {PropMgmtCoCreateDto} from "../../dtos/prop-mgmt-co/prop-mgmt-co-create.dto";
import {PropMgmtCoCreateResponseDto} from "../../dtos/prop-mgmt-co/prop-mgmt-co-create-response.dto";
import {PropMgmtCoUpdateDto} from '../../dtos/prop-mgmt-co/prop-mgmt-co-update.dto';
import {SysadminCreateResponseDto} from '../../dtos/sysadmin/sysadmin-create-response.dto';

@Injectable()
export class PropMgmtCoService {
    constructor(
        @Inject('PROP_MGMT_CO_REPOSITORY')
            private readonly  propMgmtCoRepository: Repository<PropMgmtCo>
    ) {}
    async findAll(): Promise<PropMgmtCo[]> {
        const companyList = await this.propMgmtCoRepository.find({});
        return companyList;
    }

    async findOneById(id: string): Promise<PropMgmtCo | null> {
        try {
            const response = await this.propMgmtCoRepository.findOne(id);
            if(!!response) {
                return response;
            } else {
                return null;
            }
        } catch (e) {
            const msg = e.message;
            throw new BadRequestException(`findOneById - ${msg}`);
        }
    }

    async findOneByName(name: string): Promise<PropMgmtCo | null> {
        try {
            const response =  await this.propMgmtCoRepository.find({
                where: {
                    name: Raw(alias => `${alias} ~~* '${name}'`)
                },
                take: 1,
                cache: false
            });
            if(response.length > 0) {
                return response[0]
            } else {
                return null;
            }
        } catch (e) {
            const msg = e.message;
            throw new BadRequestException(`findOneByName - ${msg}`);
        }
    }

    async createPropMgmtCo(propMgmtDto: PropMgmtCoCreateDto, user: string, id: string): Promise<PropMgmtCoCreateResponseDto> {
        if( await this.findOneByName(propMgmtDto.name)) {
            throw new BadRequestException('Company already exists');
        }
        const propCo = plainToClass(PropMgmtCo, propMgmtDto);
        propCo.created_by = user;
        propCo.created_by_uuid = id;
        try {
            const response = await this.propMgmtCoRepository.save(propCo);
            this.cleanResponse(response);
            const resp = classToPlain(response) as PropMgmtCoCreateResponseDto;
            console.log('Create Response: ', resp);
            return resp;
        } catch (e) {
            const msg = e.message;
            throw new BadRequestException(`createPropMgmtCo - ${msg}`);
        }
    }

    async updatePropMgmtCo(propMgmtDto:PropMgmtCoUpdateDto, authUser): Promise<any> {
        let propMgmtCo = plainToClass(PropMgmtCo, propMgmtDto );
        propMgmtCo.updated_date = new Date();
        propMgmtCo.updated_by = authUser.username;
        propMgmtCo.updated_by_uuid = authUser.userId;
        const response = this.propMgmtCoRepository.save(propMgmtCo);
        let resp = classToPlain(response) as PropMgmtCoCreateResponseDto;
        Object.keys(resp).forEach(k => (!resp[k] && resp[k] !== undefined) && delete resp[k]);
        console.log('updatePropMgmtCo - response: ', resp);
        return resp;
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
}

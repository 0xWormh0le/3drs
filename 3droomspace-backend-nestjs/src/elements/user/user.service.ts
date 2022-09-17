import {BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {Not, Repository} from 'typeorm';
import { User } from "../../entities/user.entity";
import {pbkdf2Sync, randomBytes} from "crypto";
import {RenterCreateDto} from "../../dtos/renter/renter-create.dto";
import { classToPlain, plainToClass} from "class-transformer";
import {LandlordCreateDto} from "../../dtos/landlord/landlord-create.dto";
import { jwtConstants } from "../../auth/jwt.constants";
import {RenterCreateResponseDto} from "../../dtos/renter/renter-create-response.dto";
import {LandlordCreateResponseDto} from "../../dtos/landlord/landlord-create-response.dto";
import {AnyUserCreateDto} from '../../dtos/any-user-create.dto';
import {RenterUpdateDto} from '../../dtos/renter/renter-update.dto';
import {LandlordUpdateDto} from '../../dtos/landlord/landlord-update.dto';
import {SysAdminUpdateDto} from '../../dtos/sysadmin/sys-admin-update.dto';
import {SysadminCreateResponseDto} from '../../dtos/sysadmin/sysadmin-create-response.dto';
import {SysAdminCreateDto} from '../../dtos/sysadmin/sysadmin-create.dto';
import {AuthUserClass} from '../../classes/authUser.class';
import {LoggedInUserDto} from '../../dtos/login/logged-in-user.dto';
import {FileUploadService} from '../file-upload/file-upload.service';
import {PropertyPhotoAddDto} from '../../dtos/property-photo/property-photo-add.dto';
import {Property} from '../../entities/property.entity';
import {PropertyUpdateDto} from '../../dtos/property/property-update.dto';
import {RenterListItemDto} from '../../dtos/renter/renter-list-item.dto';
import {LandlordListItemDto} from '../../dtos/landlord/landlord-list-item.dto';

@Injectable()
export class UserService {
    private DIGEST = 'RSA-SHA256';
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>,
        private readonly fileService: FileUploadService,
    ) {}

    async findAll(user: LoggedInUserDto): Promise<User[]> {
        console.log('findAll - user: ', user);
        let whereClause = {};
        if (user.username !== 'john@3droomspace.com') {
            whereClause = {
                email: Not('john@3droomspace.com')
            }
        }
        const userListRaw = await this.userRepository.find(whereClause);
        const userlist = await this.cleanUserList(userListRaw, true);
        return userlist;
    }

    async findAllRenters(): Promise<RenterListItemDto[]> {
        const renterListRaw = await this.userRepository.find({
            where: {
                user_type: 'RENTER'
            }
        });
        const renterList = await this.cleanUserList(renterListRaw, true);
        return renterList;
    }

    async findAllActiveRenters(): Promise<RenterListItemDto[]> {
        const renterListRaw = await this.userRepository.find({
            where: {
                user_type: 'RENTER',
                active: true,
                deleted_date: null,
            }
        });
        const renterList = await this.cleanUserList(renterListRaw, true);
        return renterList;
    }

    async findAllLandlords(): Promise<LandlordListItemDto[]> {
        const landlordListRaw = await this.userRepository.find({
            where: {
                user_type: 'LANDLORD'
            }
        });
        const landlordList = await this.cleanUserList(landlordListRaw, true);
        return landlordList;
    }

    async findAllActiveLandlords(): Promise<LandlordListItemDto[]> {
        const landlordListRaw = await this.userRepository.find({
            where: {
                user_type: 'LANDLORD',
                active: true,
                deleted_date: null,
            }
        });
        const landlordList = await this.cleanUserList(landlordListRaw, true);
        return landlordList;
    }

    async findAllHosts(): Promise<User[]> {
        const hostListRaw = await this.userRepository.find({
            where: {
                user_type: 'HOST'
            }
        });
        const hostList = await this.cleanUserList(hostListRaw, true);
        return hostList;
    }

    async findAllActiveHosts(): Promise<User[]> {
        const hostListRaw = await this.userRepository.find({
            where: {
                user_type: 'HOST',
                active: true,
                deleted_date: null,
            }
        });
        const hostList = await this.cleanUserList(hostListRaw, true);
        return hostList;
    }

    async findAllSysAdmins(): Promise<User[]> {
        const sysAdminListRaw = await this.userRepository.find({
            where: {
                user_type: 'SYS-ADMIN'
            }
        });
        const sysAdminList = await this.cleanUserList(sysAdminListRaw, true);
        return sysAdminList;
    }

    async findAllActiveSysAdmins(): Promise<User[]> {
        const sysAdminListRaw = await this.userRepository.find({
            where: {
                user_type: 'SYS-ADMIN',
                active: true,
                deleted_date: null,
            }
        });
        const sysAdminList = await this.cleanUserList(sysAdminListRaw, true);
        return sysAdminList;
    }

    async findAllSuperAdmins(): Promise<User[]> {
        const sysAdminListRaw = await this.userRepository.find({
            where: {
                user_type: 'SUPER-ADMIN'
            }
        });
        const sysAdminList = await this.cleanUserList(sysAdminListRaw, true);
        return sysAdminList;
    }

    async findAllActiveSuperAdmins(): Promise<User[]> {
        const sysAdminListRaw = await this.userRepository.find({
            where: {
                user_type: 'SUPER-ADMIN',
                active: true,
                deleted_date: null,
            }
        });
        const sysAdminList = await this.cleanUserList(sysAdminListRaw, true);
        return sysAdminList;
    }

    async findOneByUsername(username: string): Promise<any | null> {
        try {
            console.log('findOneByUsername: ', username);
            username = username.toLowerCase();
            const response =  await this.userRepository.find({
                where: {
                    email: username
                },
                take: 1,
                cache: false
            });
            if(response.length > 0) {
                let resp = response[0];
                const userResponse = await this.cleanUserList([resp]);
                // console.log('findOneByUsername - userResponse: ', userResponse);
                return userResponse[0];
            } else {
                return null;
            }
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async findOneById(id: string): Promise<any | null> {
        try {
            let response =  await this.userRepository.findOne(id);
            if(response !== undefined) {
                const userResponse = this.cleanUserList([response]);
                return userResponse;
            } else {
                return null;
            }
        } catch (e) {
            throw new BadRequestException(e.message);
        }

    }

    async findOneForProfile(username: string): Promise<User | null> {
        try {
            const response =  await this.userRepository.find({
                where: {
                    email: username
                },
                take: 1,
                cache: false
            });
            if (!!response) {
                if (response.length === 1) {
                    const resp = response[0];
                    this.cleanResponse(resp);
                    return resp;
                }
            } else {
                return null;
            }
            return response ? response[0] : undefined;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

     async findOneForLogin(username: string): Promise<User | undefined> {
        console.log('findOneForLogin');
        const response =  await this.userRepository.find({
            // select: ["id", "user_type","email","first_name", "last_name", "salt", "hash"],
            where: {
                email: username,
                active: true
            },
            take: 1,
            cache: false
        });
        return response ? response[0] : undefined;
    }

    async createRenter(userDto: RenterCreateDto): Promise<RenterCreateResponseDto> {
        console.log('createRenter - userDto: ', userDto);
        userDto.email = userDto.email.toLowerCase();
        if(await this.findOneByUsername(userDto.email)) {
            throw new BadRequestException('Renter already exists');
        }
        userDto.user_type = 'RENTER';
        const { hash, salt } = this.adjustInput(userDto);
        const user = plainToClass(User, userDto);
        user.hash = hash;
        user.salt = salt;
        try {
            const response = await this.userRepository.save(user);
            this.cleanResponse(response);
            const resp = classToPlain(response) as RenterCreateResponseDto;
            console.log('Create Response: ', resp);
            return resp;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async createLandlord(userDto: LandlordCreateDto): Promise<LandlordCreateResponseDto> {
        userDto.email = userDto.email.toLowerCase();
        if(await this.findOneByUsername(userDto.email)) {
            throw new BadRequestException('Landlord already exists');
        }
        userDto.user_type = 'LANDLORD';
        const { hash, salt } = this.adjustInput(userDto);
        const user = plainToClass(User, userDto);
        user.hash = hash;
        user.salt = salt;
        try {
            const response = await this.userRepository.save(user);
            this.cleanResponse(response);
            const resp = classToPlain(response) as LandlordCreateResponseDto;
            console.log('Create Response: ', resp);
            return resp;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async createSysAdmin(userDto: SysAdminCreateDto): Promise<SysadminCreateResponseDto> {
        userDto.email = userDto.email.toLowerCase();
        if(await this.findOneByUsername(userDto.email)) {
            throw new BadRequestException('Landlord already exists');
        }
        userDto.user_type = 'SYS-ADMIN';
        const { hash, salt } = this.adjustInput(userDto);
        const user = plainToClass(User, userDto);
        user.hash = hash;
        user.salt = salt;
        try {
            const response = await this.userRepository.save(user);
            this.cleanResponse(response);
            const resp = classToPlain(response) as SysadminCreateResponseDto;
            console.log('Create Response: ', resp);
            return resp;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async createSuperAdmin(userDto: SysAdminCreateDto): Promise<SysadminCreateResponseDto> {
        userDto.email = userDto.email.toLowerCase();
        if(await this.findOneByUsername(userDto.email)) {
            throw new BadRequestException('Landlord already exists');
        }
        userDto.user_type = 'SUPER-ADMIN';
        const { hash, salt } = this.adjustInput(userDto);
        const user = plainToClass(User, userDto);
        user.hash = hash;
        user.salt = salt;
        try {
            const response = await this.userRepository.save(user);
            this.cleanResponse(response);
            const resp = classToPlain(response) as SysadminCreateResponseDto;
            console.log('Create Response: ', resp);
            return resp;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async createAnyUser(userDto: AnyUserCreateDto): Promise<any> {
        console.log('createAnyUser - userDto: ', userDto);
        userDto.email = userDto.email.toLowerCase();
        if(await this.findOneByUsername(userDto.email)) {
            throw new BadRequestException('User already exists');
        }
        const { hash, salt } = this.adjustInput(userDto);
        const user = plainToClass(User, userDto);
        user.hash = hash;
        user.salt = salt;
        try {
            const response = await this.userRepository.save(user);
            this.cleanResponse(response);
            const resp = classToPlain(response) as LandlordCreateResponseDto;
            console.log('Create Response: ', resp);
            return resp;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    getUserTypes(): { types: string[] } {
        let types: string[] = jwtConstants.validLoginTypes.slice(); // make a copy of the array
        types.shift(); // remove first element 'SUPER-ADMIN'
        types.shift(); // remove second element 'SYS-ADMIN'
        return {types};
    }

    async updateRenter(userDto: RenterUpdateDto, authUser: AuthUserClass): Promise<RenterCreateResponseDto> {
        console.log('authUser: ', authUser);
        if(authUser.userType === 'RENTER' && authUser.userId !== userDto.id) {
            throw new BadRequestException('Wrong user id');
        }
        let renter:User;
        userDto.user_type = 'RENTER';
        const { hash, salt } = this.adjustInput(userDto);
        renter = plainToClass(User, userDto);
        renter.hash = (!!hash) ? hash : undefined;
        renter.salt = (!!salt) ? salt : undefined;
        renter.updated_date = new Date();
        renter.updated_by = authUser.username;
        renter.updated_by_uuid = authUser.userId;
        /**
         * @TODO: Change from "save" to "update" to avoid the "UPSERT" issue
         */
        const response = await this.userRepository.save(renter);
        let resp = classToPlain(response) as RenterCreateResponseDto;
        Object.keys(resp).forEach(k => (!resp[k] && resp[k] !== undefined) && delete resp[k]);
        console.log('UpdateRenter - response: ', resp);
        return resp;
    }

    async updateLandlord(userDto: LandlordUpdateDto, authUser:AuthUserClass): Promise<LandlordCreateResponseDto> {
        console.log('authUser: ', authUser);
        if(authUser.userType === 'LANDLORD' && authUser.userId !== userDto.id) {
            throw new BadRequestException('Wrong user id');
        }
        let landlord:User;
        userDto.user_type = 'LANDLORD';
        const { hash, salt } = this.adjustInput(userDto);
        landlord = plainToClass(User, userDto);
        landlord.hash = (!!hash) ? hash : undefined;
        landlord.salt = (!!salt) ? salt : undefined;
        landlord.updated_date = new Date();
        landlord.updated_by = authUser.username;
        landlord.updated_by_uuid = authUser.userId;
        const response = await this.userRepository.save(landlord);
        let resp = classToPlain(response) as LandlordCreateResponseDto;
        Object.keys(resp).forEach(k => (!resp[k] && resp[k] !== undefined) && delete resp[k]);
        console.log('UpdateLandlord - response: ', resp);
        return resp;
    }

    async updateSysAdmin(userDto: SysAdminUpdateDto, authUser:AuthUserClass): Promise<SysadminCreateResponseDto> {
        console.log('authUser: ', authUser);
        if(authUser.userType === 'SYS-ADMIN' && authUser.userId !== userDto.id) {
            throw new BadRequestException('Wrong user id');
        }
        let sysAdmin:User;
        userDto.user_type = 'SYS-ADMIN';
        const { hash, salt } = this.adjustInput(userDto);
        sysAdmin = plainToClass(User, userDto);
        sysAdmin.hash = (!!hash) ? hash : undefined;
        sysAdmin.salt = (!!salt) ? salt : undefined;
        sysAdmin.updated_date = new Date();
        sysAdmin.updated_by = authUser.username;
        sysAdmin.updated_by_uuid = authUser.userId;
        const response = await this.userRepository.save(sysAdmin);
        let resp = classToPlain(response) as SysadminCreateResponseDto;
        Object.keys(resp).forEach(k => (!resp[k] && resp[k] !== undefined) && delete resp[k]);
        console.log('UpdateSysAdmin - response: ', resp);
        return resp;
    }

    async updateSuperAdmin(userDto: SysAdminUpdateDto, authUser:AuthUserClass): Promise<SysadminCreateResponseDto> {
        console.log('authUser: ', authUser);
        // if(authUser.userType === 'SUPER-ADMIN' && authUser.userId !== userDto.id) {
        //     throw new BadRequestException('Wrong user id');
        // }
        let superAdmin:User;
        userDto.user_type = 'SUPER-ADMIN';
        const { hash, salt } = this.adjustInput(userDto);
        superAdmin = plainToClass(User, userDto);
        superAdmin.hash = (!!hash) ? hash : undefined;
        superAdmin.salt = (!!salt) ? salt : undefined;
        superAdmin.updated_date = new Date();
        superAdmin.updated_by = authUser.username;
        superAdmin.updated_by_uuid = authUser.userId;
        const response = await this.userRepository.save(superAdmin);
        this.cleanResponse(response);
        let resp = classToPlain(response) as SysadminCreateResponseDto;
        Object.keys(resp).forEach(k => (!resp[k] && resp[k] !== undefined) && delete resp[k]);
        console.log('UpdateSuperAdmin - response: ', resp);
        return resp;
    }

    async deleteUserById(id, authUser): Promise<any> {
        try {
            const user = await this.findOneById(id);
            if(!user) {
                throw new NotFoundException('User not found for Delete.');
            } else {
                if(user.soft_delete) {
                    user.deleted_date = new Date();
                    user.deleted_by = authUser.username;
                    user.deleted_by_uuid = authUser.userId;
                    const response = await this.userRepository.update(id, user);
                    return response;
                } else {
                    return await this.userRepository.delete(id);
                }
            }
        } catch (e) {
            throw new BadRequestException(`deleteUserById - ${this.processError(e)}`);
        }
    }

    async uploadAvatar(userId: string, file, type: string, userType: string, authUser, options): Promise<any> {
        const path = file.path;
        const mimeType = file.mimetype.split('/')[1].toLowerCase();
        if (this.fileService.validImageMimeTypes.indexOf(mimeType) === -1) {
            throw new BadRequestException('Invalid Mime Type');
        }
        let response;
        // console.log('uploadAvatar - params: ', {userId, path, type, mimeType});
        const url = await this.fileService.uploadSingleToGcp(userId, path, type, mimeType);
        switch (userType) {
            case 'RENTER': {
                let renter = new RenterUpdateDto();
                renter.id = userId;
                renter.avatar_url = url;
                response = await this.updateRenter(renter, authUser);
            }
                break;
            case 'LANDLORD': {
                let landlord = new LandlordUpdateDto();
                landlord.id = userId;
                landlord.avatar_url = url;
                response = await this.updateLandlord(landlord, authUser);
            }
                break;
            case 'HOST':
                /**
                 * @TODO: Implement HOST role
                 */
                break;
            case 'SUPER-ADMIN': {
                let superAdmin = new SysAdminUpdateDto();
                superAdmin.id = userId;
                superAdmin.avatar_url = url;
                response = await this.updateSysAdmin(superAdmin, authUser);
            }
                break;
            case 'SYS-ADMIN': {
                let superAdmin = new SysAdminUpdateDto();
                superAdmin.id = userId;
                superAdmin.avatar_url = url;
                response = await this.updateSuperAdmin(superAdmin, authUser);
            }
                break;
            case 'ADMIN':
                /**
                 * @TODO: Implement ADMIN role
                 */
                break;
        }
        return response;
    }

    setPassword(password) {
        let salt = randomBytes(32).toString('hex');
        let hash = pbkdf2Sync(password, salt, 1000, 64, this.DIGEST).toString('hex');
        return {salt: salt, hash: hash};
    }

    adjustInput(userDto) {
        let passObj: {hash: string, salt: string} = {hash: null, salt: null};
        if(userDto.email) {
            console.log('Set email to lowercase');
            userDto.email = userDto.email.toLowerCase();
        }
        if(userDto.first_name) {
            console.log('Uppercase first letter of First Name');
            userDto.first_name = userDto.first_name.replace(/^./, userDto.first_name[0].toUpperCase());
        }
        if(userDto.last_name) {
            console.log('Uppercase first letter of Last Name');
            userDto.last_name = userDto.last_name.replace(/^./, userDto.last_name[0].toUpperCase());
        }
        if(userDto.middle_name) {
            console.log('Uppercase first letter of Middle Name');
            userDto.middle_name = userDto.middle_name.replace(/^./, userDto.middle_name[0].toUpperCase());
        }
        if(userDto.password) {
            console.log('Set Password');
            passObj = this.setPassword(userDto.password);
            delete userDto.password;
        }
        return passObj;
    }

    cleanResponse(response) {
        // response is passed by reference therefore no need to return it
        delete response.salt;
        delete response.hash;
        delete response.ssn;
        delete response.created_by;
        delete response.created_by_uuid;
        delete response.updated_by;
        delete response.updated_by_uuid;
        delete response.updated_date;
        delete response.deleted_by;
        delete response.deleted_by_uuid;
        delete response.deleted_date;
        delete response.soft_delete;
        delete response.bg_check_done;
        delete response.use_email_verify;
        delete response.use_phone_verify;
        delete response.phone_verify_code;
        delete response.email_verify_code;
        delete response.verified;
        if(response.user_type !== 'LANDLORD') {
            delete response.company;
            delete response.companyId;
            delete response.prop_company_name;
        }
        if(response.user_type !== 'RENTER' && response.user_type !== 'HOST') {
            delete response.dob;
            delete response.relationship_status;
            delete response.gender;
            delete response.lifestyle;
            delete response.credit_score;
            delete response.credit_score_date;
            delete response.invitation_code;
        }
    }

    async cleanUserList(userListRaw, addPhoto: boolean = false): Promise<any[]> {
        return Promise.all( userListRaw.map(async (user: any) => {
            delete user.salt;
            delete user.hash;
            if(addPhoto) {
                user.avatar_url = await this.fileService.createSignedUrl(user.avatar_url);
            }
            user.fullName = `${user.first_name} ${user.last_name}`;
            return user;
        }));
    }

    processError(e) {
        let msg: string;
        if(typeof e.message ===  'object') {
            msg = e.message.message;
        } else {
            msg = e.message;
        }
        return msg;
    }
}

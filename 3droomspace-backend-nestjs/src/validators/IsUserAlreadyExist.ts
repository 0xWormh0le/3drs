import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import {Inject, Injectable, Module, Scope} from "@nestjs/common";
import {Connection, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {databaseProviders} from "../providers/database.providers";
import {DatabaseModule} from "../providers/database.module";

@ValidatorConstraint({ async: true })
@Module({
    imports: [DatabaseModule],
    providers: [...databaseProviders]
})
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    private userRepository: Repository<User>;
    constructor(         @Inject('DATABASE_CONNECTION')
                         private readonly connection: Connection) {}

    async validate(userName: any, args: ValidationArguments) {
        this.userRepository = await this.connection.getRepository(User);
        return await this.findOneByUsername(userName).then(user => {
            return !!user;
        });
    }

    async findOneByUsername(username): Promise<User | undefined> {
        const response =  await this.userRepository.find({
            select: ["email"],
            where: {
                email: username
            },
            take: 1,
            cache: false
        });
        return response ? response[0] : undefined;
    }
}



export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint
        });
    };
}

import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiConfigService {
    public dbHost: string;
    public dbUser: string;
    public dbPass: string;
    public dbName: string;
    public dbPort: number;
    public gcpImageBucket: string;
    constructor(private configService: ConfigService) {
        this.dbHost = configService.get<string>('DB_HOST');
        this.dbUser = configService.get<string>('DB_USER');
        this.dbPass = configService.get<string>('DB_PASS');
        this.dbName = configService.get<string>('DB_NAME');
        this.dbPort = configService.get<number>('DB_PORT');
        this.gcpImageBucket = configService.get('GCP_IMAGE_BUCKET');
        // console.log(`dbUser: ${this.dbUser} with pass: ${this.dbPass} for db: ${this.dbName}`);
    }
}

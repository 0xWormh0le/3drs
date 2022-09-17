import {Controller, Get, Post, UseGuards, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import {ConfigService} from "@nestjs/config";
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('General')
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly configService: ConfigService
      ) {}
  dbUser = this.configService.get<string>('DB_USER');
  @Get()
  getHello(): string {
    return this.appService.getHello(this.dbUser);
  }
}

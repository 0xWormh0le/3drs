import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(user): string {
    return `Hello World! from ${user}`;
  }
}

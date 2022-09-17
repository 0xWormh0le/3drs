import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import 'dotenv/config';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import { AllExceptionsFilter } from './providers/all-exceptions-filter.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whiteList = [
    'capacitor://localhost',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost:4500',
    'http://localhost:4600',
    'http://localhost:4800',
    'http://localhost:8100',
    'http://104.198.36.121',
    'https://www.3droomspace.net',
    'https://3droomspace.net'
  ];
  const corsOptions = {
    origin: (origin, cb) => {
      // console.log('----> origin <------: ', origin);
      if (origin === undefined) {
        cb(null, true);
      } else {
        if (whiteList.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          cb(new Error('Not allowed by CORS'));
        }
      }
    }
  };
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(json({ limit: '50mb'}));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const options = new DocumentBuilder()
    .setTitle('3DRoomspace API')
    .setDescription('API Definition for all 3DRoomspace Apps')
    .setVersion('0.0.52')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();


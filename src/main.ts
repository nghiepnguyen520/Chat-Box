import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { url } from 'inspector';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix('v1');
  initialSwagger(app);
  await app.listen(process.env.PORT);
  Logger.log(`
  =============================================

  Server is running on: ${await app.getUrl()}

  =============================================
  `);
}

function initialSwagger(app: NestExpressApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('The document about list of API for Chat Box')
    .setVersion('v1.0')
    // .setContact('Chat Box')
    // .addServer('localhost:3000', 'fine')
    .addBasicAuth()
    .addBearerAuth()
    .setBasePath('v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
}
bootstrap();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { backendServer, frontendServer } from './common/configs/config';
import { HttpExceptionFilter } from '#src/common/exception-handler/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: frontendServer.url(), credentials: true });

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Inverse Flows')
    .setDescription('Inverse flows')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(backendServer.port);
}
bootstrap();

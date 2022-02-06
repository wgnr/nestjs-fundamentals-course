import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guard/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Iluvcoffee')
    .setDescription('Nest JS course examples')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // const configService = app.get(ConfigService);
  // console.log(configService.get('PORT'));

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalGuards(new ApiKeyGuard());

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  await app.listen(3000);
}
bootstrap();

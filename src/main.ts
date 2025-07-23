import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation configuration - based on docs: https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Convert parameters in the URL to the ones described in the DTOs
      },
    }),
  );

  // Versioning configuration - based on docs: https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  // Swagger configuration - based on docs: https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Destinos Turisticos API')
    .setDescription('Documentacion de la API de Destinos Turisticos')
    .setVersion('1.0')
    .addTag(
      'touristic-destinations',
      'Touristic destinations management operations',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

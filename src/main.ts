import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './adapters/rest/common/filters/http-exception.filter';

async function bootstrap() {
  const environment = process.env.NODE_ENV || 'development';
  const baseEnvFilePath = resolve(__dirname, '..', '.env');
  const envFilePath = resolve(__dirname, '..', `.env.${environment}`);

  // Cargar el archivo .env base primero
  config({ path: baseEnvFilePath });

  // Luego, cargar el archivo específico del entorno, sobrescribiendo las variables si es necesario
  config({ path: envFilePath, override: true });
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Trust Balance Core Api')
    .setDescription('--')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/v1/docs', app, documentFactory);

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: ${await app.getUrl()} in ${environment} mode, nivel de log ${process.env.LOG_LEVEL}`,
  );
}
bootstrap();

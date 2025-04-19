import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { resolve } from 'path';

async function bootstrap() {
  const environment = process.env.NODE_ENV || 'development';
  const baseEnvFilePath = resolve(__dirname, '..', '.env');
  const envFilePath = resolve(__dirname, '..', `.env.${environment}`);

  // Cargar el archivo .env base primero
  config({ path: baseEnvFilePath });

  // Luego, cargar el archivo específico del entorno, sobrescribiendo las variables si es necesario
  config({ path: envFilePath, override: true });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: ${await app.getUrl()} in ${environment} mode`,
  );
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './infrastructure/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      //autoLoadEntities: true, // Carga automáticamente las entidades registradas
    }),
    AuthModule,
  ],
  //controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './infrastructure/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { LoggerMiddleware } from './infrastructure/http/logger.middleware';

@Module({
  imports: [
    LoggerModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

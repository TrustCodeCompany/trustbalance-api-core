import { Module, Logger } from '@nestjs/common';
import { LoggerFactory } from './logger-factory.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Importa ConfigModule para que ConfigService esté disponible
    ConfigModule,
  ],
  providers: [
    Logger,
    LoggerFactory,
    {
      provide: 'LoggerPort',
      useFactory: (loggerFactory: LoggerFactory, configService: ConfigService) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const loggerType = configService.get('LOGGER_TYPE', 'default');
        // Validar que sea un valor permitido
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const validLoggerType = ['default', 'winston'].includes(loggerType)
          ? (loggerType as 'default' | 'winston')
          : 'default';
        return loggerFactory.createLogger(validLoggerType);
      },
      inject: [LoggerFactory, ConfigService],
    },
  ],
  exports: ['LoggerPort'],
})
export class LoggerModule {}

import { Injectable } from '@nestjs/common';
import { LoggerPort } from '../../domain/services/logger.service.interface';
import { WinstonLoggerAdapter } from './winston-logger.adapter';

@Injectable()
export class LoggerFactory {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createLogger(type: 'default' | 'winston', options?: any): LoggerPort | null {
    switch (type) {
      case 'winston':
        return new WinstonLoggerAdapter();
      case 'default':
      default:
        return new WinstonLoggerAdapter();
    }
  }
}

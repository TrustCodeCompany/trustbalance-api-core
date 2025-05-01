import { Injectable } from '@nestjs/common';
import { LoggerPort } from '../../domain/services/logger.service.interface';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import genericMaskFormat from './generic-mask-format';

@Injectable()
export class WinstonLoggerAdapter implements LoggerPort {
  private logger: winston.Logger;

  constructor() {
    const { combine, timestamp, printf, colorize } = winston.format;

    // Formato personalizado
    const myFormat = printf(
      ({ level, message, timestamp, context, ...meta }) => {
        return `${timestamp} [${level}] [${context || 'Global'}]: ${message} ${
          Object.keys(meta).length ? JSON.stringify(meta) : ''
        }`;
      },
    );

    const transport: DailyRotateFile = new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(timestamp(), genericMaskFormat(), myFormat),
      //defaultMeta: { service: 'my-service' },
      transports: [
        // Consola con colores
        new winston.transports.Console({
          format: combine(colorize(), timestamp(), myFormat),
        }),
        // Archivo para todos los logs
        /*new winston.transports.File({
          filename: 'logs/combined.log',
        })*/ transport,
        // Archivo separado para errores
        new winston.transports.File({
          filename: 'logs/errors.log',
          level: 'error',
        }),
      ],
    });
  }

  debug(message: string, context?: string, meta?: Record<string, any>): void {
    this.logger.debug(message, { context, ...meta });
  }

  info(message: string, context?: string, meta?: Record<string, any>): void {
    this.logger.info(message, { context, ...meta });
  }

  warn(message: string, context?: string, meta?: Record<string, any>): void {
    this.logger.warn(message, { context, ...meta });
  }

  error(
    message: string,
    context?: string,
    error?: Error,
    meta?: Record<string, any>,
  ): void {
    this.logger.error(message, {
      context,
      errorMessage: error?.message,
      stack: error?.stack,
      ...meta,
    });
  }
}

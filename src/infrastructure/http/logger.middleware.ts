import { Injectable, NestMiddleware, Inject, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerPort } from '../../domain/services/logger.service.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // Añadir un logger de respaldo por si falla la inyección
  private readonly fallbackLogger = new Logger('HTTP');

  constructor(@Inject('LoggerPort') private readonly logger: LoggerPort) {
    // Verificación de seguridad
    if (!this.logger) {
      console.warn('LoggerPort not properly injected, using fallback logger');
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl } = req;

    // Usar un logger de respaldo si el inyectado es null
    const safeLogger = this.logger || this.fallbackLogger;
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const message = `HTTP ${method} ${originalUrl} - ${statusCode} (${responseTime}ms) - ${ip}`;

      try {
        if (statusCode >= 400) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          safeLogger.warn?.(message, 'HTTP') ||
            this.fallbackLogger.warn(message);
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          safeLogger.info?.(message, 'HTTP') ||
            this.fallbackLogger.log(message);
        }
      } catch (error) {
        // En caso de cualquier error, usar el logger interno de NestJS
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.fallbackLogger.log(`Error al registrar: ${error.message}`);
        this.fallbackLogger.log(message);
      }
    });

    next();
  }
}

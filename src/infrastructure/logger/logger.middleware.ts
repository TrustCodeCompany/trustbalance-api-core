import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerPort } from '../../domain/services/logger.service.interface';
import { NextFunction, Response as ExpressResponse } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject('LoggerPort') private readonly logger: LoggerPort) {}

  use(req: Request, res: ExpressResponse, next: NextFunction) {
    const startTime = Date.now();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { method, originalUrl, ip, body, query, params } = req;

    // Captura la respuesta para registrar el código de estado
    const originalSend = res.send;
    res.send = function (...args) {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      const logMeta = {
        method,
        url: originalUrl,
        ip,
        statusCode,
        responseTime: `${responseTime}ms`,
        requestId: req.headers['x-request-id'] || '-',
      };

      if (statusCode >= 400) {
        this.logger.warn(
          `HTTP ${method} ${originalUrl} - ${statusCode}`,
          'HTTP',
          logMeta,
        );
      } else {
        this.logger.info(
          `HTTP ${method} ${originalUrl} - ${statusCode}`,
          'HTTP',
          logMeta,
        );
      }

      return originalSend.apply(res, args);
    };

    if (process.env.LOG_REQUESTS === 'detailed') {
      this.logger.debug(`Incoming request`, 'HTTP', {
        method,
        url: originalUrl,
        body,
        query,
        params,
      });
    }

    next();
  }
}

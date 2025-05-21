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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        url: originalUrl,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ip,
        statusCode,
        responseTime: `${responseTime}ms`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.headers['x-request-id'] || '-',
      };

      if (statusCode >= 400) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        this.logger.warn(`HTTP ${method} ${originalUrl} - ${statusCode}`, 'HTTP', logMeta);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        this.logger.info(`HTTP ${method} ${originalUrl} - ${statusCode}`, 'HTTP', logMeta);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return originalSend.apply(res, args);
    };

    if (process.env.LOG_REQUESTS === 'detailed') {
      this.logger.debug(`Incoming request`, 'HTTP', {
        method,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        url: originalUrl,
        body,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        query,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params,
      });
    }

    next();
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { NotificationDto } from '../dto/notification.dto';
import { Response } from 'express';
import * as crypto from 'crypto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse() as any;

    const notification: NotificationDto = {
      uuid: body.errorId || crypto.randomUUID(),
      code: body.code || status.toString(),
      message: body.message || exception.message,
      timeStamp: new Date(),
    };

    res.status(status).json({
      success: false,
      errors: [notification],
    });
  }
}

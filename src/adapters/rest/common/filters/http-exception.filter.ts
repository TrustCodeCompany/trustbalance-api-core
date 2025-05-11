import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: exceptionResponse['error'] || exception.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: exceptionResponse['message'],
      details: exceptionResponse, // Incluye todos los datos adicionales
    });
  }
}

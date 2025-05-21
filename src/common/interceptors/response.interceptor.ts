import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { OperationResultDto } from '../dto/operation-result.dto';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, OperationResultDto<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<OperationResultDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // Si la respuesta ya es un OperationResult, no la modificamos
        if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
          return data as OperationResultDto<T>;
        }
        // Si no es un OperationResult , envolvemos la respuesta en un OperationResult
        return {
          success: true,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data,
        };
      }),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { CheckEmailHttpResponseDto } from '../dto/auth/response/check-email-http-response.dto';
import { CheckEmailResponseDto } from '../../auth/dto/response/check-email-response.dto';

@Injectable()
export class CheckEmailMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(checkEmailResponseDto: CheckEmailResponseDto): CheckEmailHttpResponseDto {
    return plainToInstance(CheckEmailHttpResponseDto, checkEmailResponseDto, this.transformOptions);
  }
}

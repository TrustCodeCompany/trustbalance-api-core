import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ChangePasswordHttpResponseDto } from '../dto/auth/response/change-password-http-response.dto';
import { ChangePasswordResponseDto } from '../../auth/dto/response/change-password-response.dto';

@Injectable()
export class ChangePasswordMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(useCaseDto: ChangePasswordResponseDto): ChangePasswordHttpResponseDto {
    return plainToInstance(ChangePasswordHttpResponseDto, useCaseDto, this.transformOptions);
  }
}

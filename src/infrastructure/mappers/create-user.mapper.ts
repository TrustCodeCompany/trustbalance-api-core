import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { CreateUserHttpResponsetDto } from '../dto/auth/response/create-user-http-response.dto';
import { CreateUserResponsetDto } from '../../auth/dto/response/create-user-response.dto';

@Injectable()
export class CreateUserMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(useCaseDto: CreateUserResponsetDto): CreateUserHttpResponsetDto {
    return plainToInstance(CreateUserHttpResponsetDto, useCaseDto, this.transformOptions);
  }
}

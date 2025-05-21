import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { CreateUserResponsetDto } from 'src/auth/dto/response/create-user-response.dto';
import { CreateUserHttpResponsetDto } from '../dto/auth/response/create-user-http-response.dto';

@Injectable()
export class CreateUserMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(useCaseDto: CreateUserResponsetDto):CreateUserHttpResponsetDto {
    return plainToInstance(
      CreateUserHttpResponsetDto,
      useCaseDto,
      this.transformOptions,
    );
  }
}

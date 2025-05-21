import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { CreateClientResponsetDto } from 'src/client/dto/response/create-client-response.dto';
import { CreateClientHttpResponsetDto } from '../dto/client/response/create-client-http-response.dto';

@Injectable()
export class CreateClientMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(useCaseDto: CreateClientResponsetDto): CreateClientHttpResponsetDto {
    return plainToInstance(CreateClientHttpResponsetDto, useCaseDto, this.transformOptions);
  }
}

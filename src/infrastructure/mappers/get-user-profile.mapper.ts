import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, instanceToPlain, plainToInstance } from 'class-transformer';
import { GetUserProfileHttpResponseDTO } from '../dto/auth/response/get-user-profile-http-response.dto';
import { GetUserProfileResponseDTO } from '../../auth/dto/response/get-user-profile-response.dto';

@Injectable()
export class GetUserProfileMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(useCaseDto: GetUserProfileResponseDTO): GetUserProfileHttpResponseDTO {
    const plain = instanceToPlain(useCaseDto);
    const httpDto = plainToInstance(GetUserProfileHttpResponseDTO, plain, this.transformOptions);
    httpDto.roles = useCaseDto.roles.map((r) => ({ name: r.name }));
    return httpDto;
  }
}

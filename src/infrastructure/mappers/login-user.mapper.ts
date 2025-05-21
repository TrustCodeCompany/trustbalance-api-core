import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { LoginUserResponsetDto } from 'src/auth/dto/response/login-user-response.dto';
import { LoginUserHttpResponsetDto } from '../dto/auth/response/login-user-http-response.dto';

@Injectable()
export class LoginUserMapper {
  private readonly transformOptions: ClassTransformOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toHttp(useCaseDto: LoginUserResponsetDto): LoginUserHttpResponsetDto {
    return plainToInstance(LoginUserHttpResponsetDto, useCaseDto, this.transformOptions);
  }
}

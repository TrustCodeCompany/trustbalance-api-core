import { Injectable } from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { UserEntity } from '../persistence/entities/user.entity';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserEntityMapper {
  private readonly defaultOptions: ClassTransformOptions = {
    //excludeExtraneousValues: true,
    enableImplicitConversion: true,
  };

  toDomain(userEntity: UserEntity | null): User {
    return plainToClass(User, userEntity, this.defaultOptions);
  }

  toEntity(user: User): UserEntity {
    return plainToClass(UserEntity, user, this.defaultOptions);
  }
}

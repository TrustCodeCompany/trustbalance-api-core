import { Module } from '@nestjs/common';
import { UserService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../infrastructure/persistence/user.repository';
import { UserEntity } from '../infrastructure/persistence/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { RoleEntity } from '../infrastructure/persistence/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [AuthController],
  providers: [
    UserService,
    RegisterUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}

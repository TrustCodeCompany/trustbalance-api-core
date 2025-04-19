import { Module } from '@nestjs/common';
import { UserService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../infrastructure/persistence/user.repository';
import { UserEntity } from '../infrastructure/persistence/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { RoleEntity } from '../infrastructure/persistence/entities/role.entity';
import { GetUserProfileUseCase } from '../application/use-cases/get-user-profile.usecase';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { UserEntityMapper } from '../infrastructure/mappers/user-entity.mapper';
import { CompanyEntity } from '../infrastructure/persistence/entities/company.entity';
import { SubscriptionEntity } from '../infrastructure/persistence/entities/subscription.entity';
import { CompanySubscriptionEntity } from '../infrastructure/persistence/entities/companySubscription.entity';
import { ClientEntity } from '../infrastructure/persistence/entities/client.entity';
import { SendGridEmailService } from '../infrastructure/external-services/email/sendgrid-email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      CompanyEntity,
      SubscriptionEntity,
      CompanySubscriptionEntity,
      ClientEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    RegisterUserUseCase,
    GetUserProfileUseCase,
    LoginUserUseCase,
    UserEntityMapper,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'EmailService',
      useClass: SendGridEmailService,
    },
  ],
})
export class AuthModule {}

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
import { JwtServiceImpl } from '../infrastructure/auth/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../infrastructure/auth/guards/jwt-auth.guard';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';
import { LoggerModule } from '../infrastructure/logger/logger.module';

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
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Usa una variable de entorno en producción
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    RegisterUserUseCase,
    GetUserProfileUseCase,
    LoginUserUseCase,
    UserEntityMapper,
    JwtStrategy, // Asegúrate de incluir la estrategia
    JwtAuthGuard, // Incluye el guard si lo vas a usar globalmente
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'EmailService',
      useClass: SendGridEmailService,
    },
    {
      provide: 'JwtService',
      useClass: JwtServiceImpl,
    },
    /*{
      provide: 'winLoggerPort',
      useClass: WinstonLoggerAdapter,
    },*/
  ],
})
export class AuthModule {}

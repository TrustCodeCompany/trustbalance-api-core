import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { CreateUserRequestDto } from '../../auth/dto/request/create-user-request.dto';
import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { PasswordGenerator } from '../../utils/PasswordGenerator';
import { BcryptUtils } from '../../utils/BcryptUtils';
import { Company } from '../../domain/entities/company.entity';
import { Role } from '../../domain/entities/role.entity';
import { EmailService } from '../../domain/services/email.service.interface';
import { EmailData } from '../../domain/entities/email.entity';
import { LoggerPort } from '../../domain/services/logger.service.interface';
import { CreateUserResponsetDto } from '../../auth/dto/response/create-user-response.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userService: UserService,
    @Inject('EmailService') private readonly emailService: EmailService,
    @Inject('LoggerPort') private readonly logger: LoggerPort,
  ) {}

  async execute(userData: CreateUserRequestDto): Promise<CreateUserResponsetDto> {
    if ((await this.userService.findByEmail(userData.email)) !== null) {
      throw new UserAlreadyExistsException(userData.email);
    }

    const password: string = PasswordGenerator.generatePassword(6, {
      digits: true,
      lowercase: true,
      uppercase: true,
      symbols: true,
    });
    const passwordEncrypt: string = await BcryptUtils.encrypt(password);

    const company: Company = Company.create(userData.name, userData.ruc);

    const arr: Role[] = [];
    const roleIds: string[] = userData.roleIds ?? ['2'];
    const uniqueRoleIds: string[] = [...new Set(roleIds)];

    uniqueRoleIds.forEach((roleId) => {
      const x = new Role(roleId);
      arr.push(x);
    });

    const user: User = User.create(
      userData.email,
      userData.name,
      userData.lastName,
      passwordEncrypt,
      arr,
      company,
    );
    await this.userService.createUser(user).then(async () => {
      const emailToSend: EmailData = {
        to: userData.email,
        from: 'trustcodesac@gmail.com',
        subject: 'creacion de cuenta',
        html: `<p>Hola ${userData.name} ${userData.lastName}, tu cuenta esta creada y esta es tu <strong>contraseña: ${password}</strong>, por favor asegurate de cambiarla luego de iniciar sesion.</p>`,
      };

      await this.emailService.sendEmail(emailToSend);
    });

    return new CreateUserResponsetDto();
  }
}

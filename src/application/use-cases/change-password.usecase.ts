import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { LoggerPort } from '../../domain/services/logger.service.interface';
import { ChangePasswordDto } from '../../auth/dto/request/change-password-request.dto';
import { ChangePasswordResponseDto } from '../../auth/dto/response/change-password-response.dto';
import { User } from '../../domain/entities/user.entity';
import { BcryptUtils } from '../../utils/BcryptUtils';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private userService: UserService,
    @Inject('LoggerPort') private readonly logger: LoggerPort,
  ) {}

  async execute(
    changePasswordDto: ChangePasswordDto,
    email: string,
  ): Promise<ChangePasswordResponseDto> {
    const user: User | null = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isSamePassword: boolean =
      changePasswordDto.newPassword === changePasswordDto.confirmNewPassword;

    if (!isSamePassword) {
      throw new UnauthorizedException('Las constraseñas no coinciden');
    }

    const passwordEncrypt: string = await BcryptUtils.encrypt(changePasswordDto.newPassword);

    const updated: number | undefined = await this.userService.updatePassword(
      email,
      passwordEncrypt,
    );

    if (updated && updated <= 0) {
      this.logger.debug('No se Pudo Actualizar', 'ChangePasswordUseCase');
      return new ChangePasswordResponseDto('No se Pudo Actualizar');
    }

    return new ChangePasswordResponseDto('Actualizacion Satisfactoria');
  }
}

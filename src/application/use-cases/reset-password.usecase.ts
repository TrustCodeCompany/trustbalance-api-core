import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { JwtService } from '../../domain/services/jwt.service.interface';
import { ResetPasswordRequestDto } from '../../auth/dto/request/reset-password-request.dto';
import { ResetPasswordResponseDto } from '../../auth/dto/response/reset-password-response.dto';
import { BcryptUtils } from '../../utils/BcryptUtils';
import { LoggerPort } from '../../domain/services/logger.service.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private userService: UserService,
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('LoggerPort') private readonly logger: LoggerPort,
  ) {}

  async execute(
    resetPasswordRequestDto: ResetPasswordRequestDto,
  ): Promise<ResetPasswordResponseDto> {
    let payload: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload = await this.jwtService.verifyToken(resetPasswordRequestDto.token);
      console.log('payload', payload);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.logger.error(error);
      throw new UnauthorizedException(
        'El token de restablecimiento de contraseña es inválido o ha expirado.',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const userEmail = payload.email;
    if (!userEmail) {
      throw new BadRequestException('El token no contiene la información necesaria.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user: User | null = await this.userService.findByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Usuario asociado al token no encontrado.');
    }

    const passwordEncrypt: string = await BcryptUtils.encrypt(resetPasswordRequestDto.newPassword);
    await this.userService.updatePassword(user.email, passwordEncrypt);
    return new ResetPasswordResponseDto('Tu contraseña ha sido restablecida exitosamente.');
  }
}

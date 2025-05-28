import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { CheckEmailResponseDto } from '../../auth/dto/response/check-email-response.dto';
import { User } from '../../domain/entities/user.entity';
import { EmailData } from '../../domain/entities/email.entity';
import { EmailService } from '../../domain/services/email.service.interface';
import { JwtService } from '../../domain/services/jwt.service.interface';

@Injectable()
export class CheckEmailUseCase {
  constructor(
    private userService: UserService,
    @Inject('EmailService') private readonly emailService: EmailService,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}
  async execute(email: string): Promise<CheckEmailResponseDto> {
    const user: User | null = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    } else {
      const payload = {
        email: user.email,
      };
      const token: string = await this.jwtService.generateToken(payload);
      const url = `https://trustbalance.vercel.app/reset-password?token=${token}`;
      const emailToSend: EmailData = {
        to: email,
        from: 'trustcodesac@gmail.com',
        subject: 'Instrucciones para restablecer tu contraseña',
        html: `
                <p>Hola, ${user.name}.</p></br>
                Alguien solicitó cambiar la contraseña de tu cuenta. Si fuiste tú, crea una nueva contraseña y podrás acceder de nuevo.</br>
                Si no solicitaste este cambio, por favor ignora este correo. Tu contraseña permanecerá igual.</br>
                <a href=${url}  class="button">Cambiar contraseña</a>
              `,
      };

      await this.emailService.sendEmail(emailToSend);
    }

    return new CheckEmailResponseDto('Se envio el correo satisfactoriamente, revisa tu bandeja.');
  }
}

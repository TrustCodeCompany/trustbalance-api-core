import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { compare } from 'bcrypt';
import { LoginUserRequestDto } from '../../auth/dto/request/login-user-request.dto';
import { LoginUserResponsetDto } from '../../auth/dto/response/login-user-response.dto';
import { JwtService } from '../../domain/services/jwt.service.interface';
import { LoggerPort } from '../../domain/services/logger.service.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private userService: UserService,
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('LoggerPort') private readonly logger: LoggerPort,
  ) {}

  async execute(
    loginUserRequestDto: LoginUserRequestDto,
  ): Promise<LoginUserResponsetDto> {
    this.logger.debug(`Successfully log in`, 'LoginUserUseCase', {
      email: loginUserRequestDto.email,
      mask: ['email'],
      maskOptions: { email: { showStart: 8, showEnd: 0 } },
    });

    const user = await this.userService.findByEmail(loginUserRequestDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(
      loginUserRequestDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      roles: user.roles.map((role) => ({ name: role.name })),
    };

    const token: string = await this.jwtService.generateToken(payload);

    return new LoginUserResponsetDto(token);
  }
}

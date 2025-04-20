import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { compare } from 'bcrypt';
import { LoginUserDto } from '../../auth/dto/login.dto';
import { plainToClass } from 'class-transformer';
import { AuthResponseDto } from '../dtos/response/auth-response.dto';
import { JwtService } from '../../domain/services/jwt.service.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private userService: UserService,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(loginUserDto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      roles: user.roles.map((role) => ({ name: role.name })),
    };

    const token: string = await this.jwtService.generateToken(payload);
    //Logger.debug('User signed with token');

    return plainToClass(AuthResponseDto, {
      traceId: crypto.randomUUID(),
      results: {
        status: 'OK',
        message: 'Succesful operation.',
        token: token,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { compare } from 'bcrypt';
import { LoginUserDto } from '../../auth/dto/login.dto';
import { plainToClass } from 'class-transformer';
import { AuthResponseDto } from '../dtos/response/auth-response.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(private userService: UserService) {}

  async execute(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }

    const isValidPassword = await compare(loginUserDto.password, user.password);
    if (!isValidPassword) {
      throw new Error('usuario o contraseña incorrecto');
    }

    /*const payload = {
      email: user.email,
      roles: user.roles.map((role) => ({ name: role.name })),
    };*/

    //const token: string = await this.jwtService.sign(payload);
    //Logger.debug('User signed with token');

    return plainToClass(AuthResponseDto, {
      traceId: crypto.randomUUID(),
      results: {
        status: 'OK',
        message: 'Succesful operation.',
        token: '',
      },
    });
  }
}

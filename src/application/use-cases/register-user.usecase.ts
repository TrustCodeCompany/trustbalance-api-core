import { Injectable } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userService: UserService,
    //private emailService: EmailService,
  ) {}

  async execute(userData: CreateUserDto): Promise<User | null> {
    // 1. Validación específica del caso de uso
    /*if (userData.password !== userData.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // 2. Verificar si el usuario ya existe
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // 3. Crear el usuario (delegando al servicio)
    const user = await this.userService.create({
      email: userData.email,
      password: userData.password,
      isActive: false,
    });

    // 4. Enviar email de bienvenida
    await this.emailService.sendWelcomeEmail(user.email);*/

    return this.userService.findByEmail(userData.email);
  }
}

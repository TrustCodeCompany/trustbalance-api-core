import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { plainToClass } from 'class-transformer';
import { GetUserProfileResponseDTO } from '../dtos/response/get-user-profile-response.dto';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private userService: UserService) {}

  async execute(email: string, roles: string[]): Promise<GetUserProfileResponseDTO> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }

    // Verificar roles
    const userRoles = user.roles.map((role) => role.name);
    const hasValidRole = roles.some((role) => userRoles.includes(role));
    if (!hasValidRole) {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }

    // Transformar los roles y Verificar el campo subscriptionName así como tambien su estado (Activo/Inactivo)
    const transformedUser = {
      ...user,
      roles: user.roles.map((role) => ({ name: role.name })),
      subscriptionName:
        user.company?.subscriptions?.find((sub) => sub.isActive)?.subscription.name || null,
    };

    return plainToClass(GetUserProfileResponseDTO, transformedUser, {
      excludeExtraneousValues: true,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../auth/auth.service';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private userService: UserService) {}

  async execute(email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }
    return user;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../domain/repositories/user.repository.interface';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryPort,
    //private readonly notificationService: NotificationPort
  ) {}

  async createUser(user: User): Promise<void> {
    await this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updatePassword(email: string, password: string): Promise<number | undefined> {
    return this.userRepository.updatePasswordByEmail(email, password);
  }
}

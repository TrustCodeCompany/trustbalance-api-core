import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.interface';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  /*create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  delete(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }*/

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userEntity: UserEntity | null = await this.repository.findOne({
        where: {
          email: email,
        },
      });

      if (!userEntity) return null;

      return plainToClass(User, userEntity);
    } catch (error) {
      console.error('Error findByEmail user:', error);
      throw error;
    }
  }

  /*async save(auth: Auth): Promise<void> {
    // Mapear de entidad de dominio (Auth) a entidad de base de datos (AuthEntity)
    const authEntity = classToPlain(auth) as AuthEntity;
    await this.authRepo.save(authEntity);
  }*/
}

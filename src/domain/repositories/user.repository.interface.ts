import { User } from '../entities/user.entity';

export interface UserRepositoryPort {
  //create(user: User): Promise<User>;
  //findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  //delete(email: string): Promise<void>;
}

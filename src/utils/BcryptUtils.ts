import { hash } from 'bcrypt';

export class BcryptUtils {
  static async encrypt(password: string): Promise<string> {
    return await hash(password, 10);
  }
}

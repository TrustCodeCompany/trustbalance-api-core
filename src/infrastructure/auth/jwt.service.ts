import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtService as JwtServiceInterface } from '../../domain/services/jwt.service.interface';

@Injectable()
export class JwtServiceImpl implements JwtServiceInterface {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error: any) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

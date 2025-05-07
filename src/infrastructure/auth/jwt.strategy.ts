import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface Payload {
  sub: string;
  email: string;
  username: string;
  roles: string[];
  subscription: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  validate(payload: Payload) {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
      roles: payload.roles,
      subscriptions: payload.subscription,
    };
  }
}

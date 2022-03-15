import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECURITY_KEY,
      issuer: process.env.TOKEN_ISSUER,
      audience: process.env.TOKEN_AUDIENCE,
    });
  }

  //TODO:
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

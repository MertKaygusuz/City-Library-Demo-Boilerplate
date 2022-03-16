import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { MembersModule } from '../members/members.module';
import { AuthService } from './services/auth.service';
import { AccessTokenService } from './services/access-token.service';
import { RefreshTokenService } from './services/refresh-token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MembersModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECURITY_KEY,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        issuer: process.env.TOKEN_ISSUER,
        audience: process.env.TOKEN_AUDIENCE,
      },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AccessTokenService,
    RefreshTokenService,
    JwtStrategy,
  ],
})
export class AuthModule {}

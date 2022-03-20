import { Inject, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomString } from 'src/utils/functions/randoms';
import { CreateTokenResultDto } from '../dto/create-token-result.dto';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class AccessTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CONTEXT) private context,
  ) {}

  public createToken(payload: any): CreateTokenResultDto {
    return new CreateTokenResultDto(
      this.createAccessToken(payload),
      this.createRefreshTokenKey(),
      payload.memberId,
      payload.memberName,
      this.context?.req?.ip,
      this.context?.req?.headers['user-agent'],
    );
  }

  private createRefreshTokenKey = () => {
    return randomString();
  };

  public createAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      issuer: process.env.TOKEN_ISSUER,
      audience: process.env.TOKEN_AUDIENCE,
      secret: process.env.TOKEN_SECURITY_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
  }
}

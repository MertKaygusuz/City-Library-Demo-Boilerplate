import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomString } from 'src/utils/functions/randoms';
import { CreateTokenPayload } from '../dto/create-token.payload';
import { CreateTokenResultDto } from '../dto/create-token-result.dto';
import { CONTEXT } from '@nestjs/graphql';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CONTEXT) private context,
  ) {}

  public createToken(payload: CreateTokenPayload): CreateTokenResultDto {
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

  public createAccessToken(payload: CreateTokenPayload) {
    //re-mapping here. Otherwise jwt-sign craches.
    const payloadForSignIn = {
      fullName: payload.fullName,
      memberId: payload.memberId,
      memberName: payload.memberName,
      roles: payload.roles,
    };
    return this.jwtService.sign(payloadForSignIn, {
      issuer: process.env.TOKEN_ISSUER,
      audience: process.env.TOKEN_AUDIENCE,
      secret: process.env.TOKEN_SECURITY_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
  }
}
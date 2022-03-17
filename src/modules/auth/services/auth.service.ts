import { Logger, Injectable, BadRequestException } from '@nestjs/common';
import { Member } from 'src/modules/members/entities/member.entity';
import { MembersService } from 'src/modules/members/members.service';
import { checkPasswordHash } from 'src/utils/functions/password-related';
import { LoginInput } from '../dto/login.input';
import { TokenReponseDto } from '../dto/token.response.dto';
import { RefreshToken } from '../entities/cache/refresh-token';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly memberService: MembersService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async login(loginInput: LoginInput): Promise<TokenReponseDto> {
    const member: Member = await this.memberService.getMembersByMemberName(
      loginInput.memberName,
    );

    if (!member || !checkPasswordHash(loginInput.password, member.password))
      throw new BadRequestException('User name or password is incorrect.');

    const roleNames = member.roles.map((x) => x.roleName);

    const token = this.accessTokenService.createToken({
      memberId: member.memberId,
      memberName: member.memberName,
      fullName: member.fullName,
      roles: roleNames,
    });

    const refreshToken: RefreshToken = {
      tokenKey: token.refreshToken,
      memberName: member.memberName,
      memberId: member.memberId,
      fullName: member.fullName,
      memberRoleNames: roleNames,
      clientIp: token.clientIp,
      clientAgent: token.clientAgent,
    };

    await this.refreshTokenService.createOrUpdate(refreshToken);

    this.logger.log(
      `[AuthService -> login] Login was executed successfully. 
       MemberName: ${member.memberName}, 
       MemberId: ${member.memberId}, 
       IP: ${token.clientIp}, 
       Agent: ${token.clientAgent}.`,
    );

    return new TokenReponseDto(token.accessToken, token.refreshToken);
  }

  async logout(tokenKey: string) {
    await this.refreshTokenService.delete(tokenKey);
  }

  async refreshLogin(refreshTokenKey: string): Promise<TokenReponseDto> {
    const oldToken: RefreshToken = await this.refreshTokenService.getByKey(
      refreshTokenKey,
    );

    if (!oldToken)
      throw new BadRequestException('Refresh token could not be found!');

    const newToken = this.accessTokenService.createToken({
      memberId: oldToken.memberId,
      memberName: oldToken.memberName,
      fullName: oldToken.fullName,
      roles: oldToken.memberRoleNames,
    });

    const newRefreshToken: RefreshToken = {
      tokenKey: newToken.refreshToken,
      clientIp: newToken.clientIp,
      clientAgent: newToken.clientAgent,
      memberName: oldToken.memberName, // get some old values from cache
      memberId: oldToken.memberId,
      fullName: oldToken.fullName,
      memberRoleNames: oldToken.memberRoleNames,
    };

    Promise.all([
      this.refreshTokenService.createOrUpdate(newRefreshToken),
      this.refreshTokenService.delete(refreshTokenKey),
    ]);

    this.logger.log(
      `[AuthService -> refreshLogin] Refresh login was executed successfully. 
       MemberName: ${oldToken.memberName}, 
       MemberId: ${oldToken.memberId}, 
       IP: ${newToken.clientIp}, 
       Agent: ${newToken.clientAgent}.`,
    );

    return new TokenReponseDto(newToken.accessToken, newToken.refreshToken);
  }
}

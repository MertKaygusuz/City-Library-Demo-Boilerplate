export class CreateTokenResultDto {
  constructor(
    accessToken: string,
    refreshToken: string,
    memberId: string,
    memberName: string,
    clientIp: string,
    clientAgent: string,
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.memberId = memberId;
    this.memberName = memberName;
    this.clientIp = clientIp;
    this.clientAgent = clientAgent;
  }
  accessToken: string;
  refreshToken: string;
  memberId: string;
  memberName: string;
  clientIp: string;
  clientAgent: string;
}

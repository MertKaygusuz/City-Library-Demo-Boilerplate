export class CreateTokenPayload {
  constructor(
    memberId: string,
    memberName: string,
    fullName: string,
    roles: string[],
  ) {
    this.memberId = memberId;
    this.memberName = memberName;
    this.fullName = fullName;
    this.roles = roles;
  }
  memberName: string;
  fullName: string;
  memberId: string;
  roles: string[];
}

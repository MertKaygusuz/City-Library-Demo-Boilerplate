import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';
import { IMembersRepo, Member_Repo } from './domain/members.interface.repo';
import { IRolesRepo, Role_Repo } from './domain/roles.interface.repo';
import { Member } from './entities/member.entity';
import { RegistrationInput } from './dto/registration.input';
import { createPasswordHash } from 'src/utils/functions/password-related';

@Injectable()
export class MembersService {
  defaultRoleNameList = ['User'];
  constructor(
    @Inject(Member_Repo)
    private readonly membersRepo: IMembersRepo,
    @Inject(Role_Repo)
    private readonly rolesRepo: IRolesRepo,
  ) {}

  async getMembersByMemberName(memberName: string): Promise<Member> {
    const memberNameKey = nameof<Member>((x) => x.memberName);
    const result = await this.membersRepo.findOne({
      [memberNameKey]: memberName,
    });
    if (!result) throw new NotFoundException('Member could not be found!');
    return result;
  }

  async getMembersByMemberId(memberId: string): Promise<Member> {
    const result = await this.membersRepo.findOneById(memberId);
    if (!result) throw new NotFoundException('Member could not be found!');
    return result;
  }

  async register(registrationInput: RegistrationInput): Promise<string> {
    const newMember = new Member();
    newMember.memberName = registrationInput.memberName;
    newMember.fullName = registrationInput.fullName;
    newMember.address = registrationInput.address;
    newMember.birthDate = registrationInput.birthDate;
    newMember.password = createPasswordHash(registrationInput.password);
    const roles = await this.rolesRepo.findWithOptions({
      where: {
        roleName: { $in: this.defaultRoleNameList },
      },
    });

    newMember.roles = roles;

    await this.membersRepo.create(newMember);

    return newMember._id;
  }

  async adminUpdateMember(registrationInput: RegistrationInput) {
    const memberNameKey = nameof<Member>((x) => x.memberName);
    const updateResult = await this.membersRepo.update(
      { [memberNameKey]: registrationInput.memberName },
      {
        fullName: registrationInput.fullName,
        birthDate: registrationInput.birthDate,
        address: registrationInput.address,
      },
    );

    if (!updateResult.affected)
      throw new NotFoundException('Member could not be found!');
  }
}

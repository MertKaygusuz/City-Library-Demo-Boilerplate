import { Inject, Injectable, Scope } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';
import { IMembersRepo, Member_Repo } from './domain/members.interface.repo';
import { IRolesRepo, Role_Repo } from './domain/roles.interface.repo';
import { Member } from './entities/member.entity';
import { RegistrationInput } from './dto/registration.input';
import { createPasswordHash } from 'src/utils/functions/password-related';
import { ObjectID } from 'mongodb';
import { CONTEXT } from '@nestjs/graphql';
import { AdminUpdateInput } from './dto/admin-update.input';
import { SelfUpdateInput } from './dto/self-update.input';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
  CustomExceptionBase,
  CustomException,
} from 'src/filters/models/custom-exception';

@Injectable({ scope: Scope.REQUEST })
export class MembersService {
  defaultRoleNameList = ['User'];
  constructor(
    @Inject(Member_Repo)
    private readonly membersRepo: IMembersRepo,
    @Inject(Role_Repo)
    private readonly rolesRepo: IRolesRepo,
    @Inject(CONTEXT) private readonly context,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async doesMemberExist(memberId: string): Promise<boolean> {
    const member = await this.membersRepo.findOne({
      _id: new ObjectID(memberId),
      [nameof<Member>((x) => x.isDeleted)]: false,
    });
    return typeof member !== 'undefined';
  }

  async getMembersByMemberName(memberName: string): Promise<Member> {
    const memberNameKey = nameof<Member>((x) => x.memberName);
    const result = await this.membersRepo.findOne({
      [memberNameKey]: memberName,
    });
    if (!result) await this.throwMemberNotFoundError();
    return result;
  }

  async getMembersByMemberId(memberId: string): Promise<Member> {
    const result = await this.membersRepo.findOneById(memberId);
    if (!result) await this.throwMemberNotFoundError();
    result.password = null;
    return result;
  }

  async register(registrationInput: RegistrationInput): Promise<string> {
    //it has been already handled by validation pipe
    const minimumPasswordLength = 8;
    if (registrationInput.password.length < minimumPasswordLength) {
      const errorMessage = await this.i18n.translate('error.PASSWORD_LENGTH', {
        args: { minimumPasswordLength: minimumPasswordLength },
      });

      const error = CustomExceptionBase.createInstance([errorMessage]);

      throw new CustomException([error]);
    }

    const newMember = new Member();
    newMember.memberName = registrationInput.memberName;
    newMember.fullName = registrationInput.fullName;
    newMember.address = registrationInput.address;
    newMember.birthDate = registrationInput.birthDate;
    newMember.password = createPasswordHash(registrationInput.password);
    const roles = await this.rolesRepo.getRolesWithIncludingNames(
      this.defaultRoleNameList,
    );

    newMember.roles = roles;

    await this.membersRepo.create(newMember);

    return newMember._id;
  }

  async memberSelfUpdate(memberSelfUpdateInput: SelfUpdateInput) {
    const memberName = this.context.req?.user?.memberName;
    if (!memberName) await this.throwMemberNotFoundError();
    const adminUpdateInput: AdminUpdateInput = {
      memberName: memberName,
      fullName: memberSelfUpdateInput.fullName,
      birthDate: memberSelfUpdateInput.birthDate,
      address: memberSelfUpdateInput.address,
    };

    await this.adminUpdateMember(adminUpdateInput);
  }

  async adminUpdateMember(adminUpdateInput: AdminUpdateInput) {
    const memberNameKey = nameof<Member>((x) => x.memberName);
    const updatedCount = await this.membersRepo.update(
      { [memberNameKey]: adminUpdateInput.memberName },
      {
        fullName: adminUpdateInput.fullName,
        birthDate: adminUpdateInput.birthDate,
        address: adminUpdateInput.address,
      },
    );

    if (!updatedCount) await this.throwMemberNotFoundError();
  }

  private async throwMemberNotFoundError() {
    const error = await CustomExceptionBase.createInstanceWithI18n(this.i18n, [
      'MEMBER_NOT_FOUND',
    ]);

    throw new CustomException([error], '404');
  }
}

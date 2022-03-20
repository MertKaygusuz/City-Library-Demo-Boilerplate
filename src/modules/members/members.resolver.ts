import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { RegistrationInput } from './dto/registration.input';
import { AdminUpdateInput } from './dto/admin-update.input';
import { SelfUpdateInput } from './dto/self-update.input';
import { AuthRolesGuard } from '../auth/guards/auth-roles.guard';
import { AllowAnonymous } from '../auth/decorators/allow-anonymous.decorator';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Query(() => Member)
  @AuthRolesGuard('Admin')
  async getMembersByMemberName(
    @Args('memberName', { type: () => String }) memberName: string,
  ): Promise<Member> {
    return await this.membersService.getMembersByMemberName(memberName);
  }

  @Query(() => Member)
  @AuthRolesGuard('Admin')
  async getMembersByMemberId(
    @Args('memberId', { type: () => String }) memberId: string,
  ): Promise<Member> {
    return await this.membersService.getMembersByMemberId(memberId);
  }

  @Mutation(() => String, { description: 'registers new member to system' })
  @AllowAnonymous()
  async register(
    @Args('registrationInput') registrationInput: RegistrationInput,
  ): Promise<string> {
    return await this.membersService.register(registrationInput);
  }

  @Mutation(() => Boolean, {
    description: 'members can update their own info except password and roles.',
  })
  async memberSelfUpdate(
    @Args('memberSelfUpdateInput') memberSelfUpdateInput: SelfUpdateInput,
  ) {
    await this.membersService.memberSelfUpdate(memberSelfUpdateInput);
    return true;
  }

  @Mutation(() => Boolean, {
    description:
      "Admin can update any member's info except password and roles.",
  })
  @AuthRolesGuard('Admin')
  async adminUpdateMember(
    @Args('adminUpdateInput') adminUpdateInput: AdminUpdateInput,
  ) {
    await this.membersService.adminUpdateMember(adminUpdateInput);
    return true;
  }
}

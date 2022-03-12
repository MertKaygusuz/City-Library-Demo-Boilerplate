import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { Member } from './entities/member.entity';
import { RegistrationInput } from './dto/registration.input';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Query(() => Member)
  async getMembersByMemberName(
    @Args('memberName', { type: () => String }) memberName: string,
  ): Promise<Member> {
    return await this.membersService.getMembersByMemberName(memberName);
  }

  @Query(() => Member)
  async getMembersByMemberId(
    @Args('memberId', { type: () => String }) memberId: string,
  ): Promise<Member> {
    return await this.membersService.getMembersByMemberId(memberId);
  }

  @Mutation(() => String)
  async register(
    @Args('registrationInput') registrationInput: RegistrationInput,
  ): Promise<string> {
    return await this.membersService.register(registrationInput);
  }

  @Mutation(() => Boolean)
  async adminUpdateMember(
    @Args('registrationInput') registrationInput: RegistrationInput,
  ) {
    await this.membersService.adminUpdateMember(registrationInput);
    return true;
  }
}

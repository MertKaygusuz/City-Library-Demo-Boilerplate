import { CreateMemberInput } from './create-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberInput extends PartialType(CreateMemberInput) {
  @Field(() => Int)
  id: number;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AssigningBookInput {
  @Field(() => String, { nullable: false })
  bookId: string;
  @Field(() => String, { nullable: false })
  memberId: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActiveBookReservationsFilterInput {
  @Field(() => String, { nullable: true })
  memberId: string;
  @Field(() => String, { nullable: true })
  bookId: string;
}

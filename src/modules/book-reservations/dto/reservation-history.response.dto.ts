import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReservationHistoryResponseDto {
  @Field(() => Float)
  receivedDate: number;
  @Field(() => Float)
  returnDate: number;
  @Field(() => String)
  memberId: string;
  @Field(() => String)
  bookId: string;
}

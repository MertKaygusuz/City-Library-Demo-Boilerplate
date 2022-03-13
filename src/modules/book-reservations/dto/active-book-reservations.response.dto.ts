import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ActiveBookReservationsResponseDto {
  @Field(() => Float)
  receivedDate: number;
  @Field(() => Float)
  availableAt: number;
  @Field(() => String)
  memberId: string;
  @Field(() => String)
  bookId: string;
}

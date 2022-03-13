import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NumberOfBooksReservedByMembersResponseDto {
  @Field(() => Int)
  activeBookReservationsCount: number;
  @Field(() => String)
  fullName: string;
  @Field(() => String)
  memberName: string;
  @Field(() => String)
  address: string;
  @Field(() => Float)
  birthDate: number;
}

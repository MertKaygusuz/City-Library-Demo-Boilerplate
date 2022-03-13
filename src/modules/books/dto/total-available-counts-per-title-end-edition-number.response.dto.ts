import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalAvailableCountsPerTitleEndEditionNumberResponseDto {
  @Field(() => String)
  bookTitle: string;
  @Field(() => Int)
  editionNumber: number;
  @Field(() => Int)
  totalAvailableCount: number;
}

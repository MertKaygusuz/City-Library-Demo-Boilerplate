import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BookReservation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

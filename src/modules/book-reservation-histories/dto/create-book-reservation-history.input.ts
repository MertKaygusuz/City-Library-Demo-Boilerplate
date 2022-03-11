import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookReservationHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

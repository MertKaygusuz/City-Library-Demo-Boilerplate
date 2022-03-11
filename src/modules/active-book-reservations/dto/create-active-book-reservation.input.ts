import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateActiveBookReservationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { CreateActiveBookReservationInput } from './create-active-book-reservation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateActiveBookReservationInput extends PartialType(CreateActiveBookReservationInput) {
  @Field(() => Int)
  id: number;
}

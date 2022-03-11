import { CreateBookReservationHistoryInput } from './create-book-reservation-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookReservationHistoryInput extends PartialType(CreateBookReservationHistoryInput) {
  @Field(() => Int)
  id: number;
}

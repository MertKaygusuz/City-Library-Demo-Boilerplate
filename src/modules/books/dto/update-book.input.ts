import { InputType, Field, PartialType } from '@nestjs/graphql';
import { RegisterBookInput } from './register-book.input';

@InputType()
export class UpdateBookInput extends PartialType(RegisterBookInput) {
  @Field(() => String, { nullable: false })
  id: string;
}

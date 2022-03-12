import { Field, InputType, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'contains member update info' })
export class SelfUpdateInput {
  @Field(() => String, {
    nullable: false,
  })
  fullName: string;
  @Field(() => Int, {
    description: 'Birth date in epoch milliseconds',
    nullable: false,
  })
  birthDate: number;
  @Field(() => String, {
    nullable: false,
  })
  address: string;
  @Field(() => String, {
    nullable: false,
  })
  @MinLength(8)
  password: string;
}

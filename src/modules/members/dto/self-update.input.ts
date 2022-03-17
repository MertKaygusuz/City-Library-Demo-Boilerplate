import { Field, Float, InputType } from '@nestjs/graphql';
@InputType({ description: 'contains member update info' })
export class SelfUpdateInput {
  @Field(() => String, {
    nullable: false,
  })
  fullName: string;
  @Field(() => Float, {
    description: 'Birth date in epoch milliseconds',
    nullable: false,
  })
  birthDate: number;
  @Field(() => String, {
    nullable: false,
  })
  address: string;
}

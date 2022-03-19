import { Field, Float, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
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
  @IsInt()
  birthDate: number;
  @Field(() => String, {
    nullable: false,
  })
  @IsInt()
  address: string;
}

import { InputType, Field, Float } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType({ description: 'contains member update info' })
export class AdminUpdateInput {
  @Field(() => String, {
    nullable: false,
  })
  memberName: string;
  @Field(() => String, {
    nullable: false,
  })
  fullName: string;
  @Field(() => Float, {
    description: 'Birth date in epoch milliseconds',
    nullable: false,
  })
  @IsInt({ message: 'validation-error.DATE' })
  birthDate: number;
  @Field(() => String, {
    nullable: false,
  })
  address: string;
}

import { Field, Float, InputType } from '@nestjs/graphql';
import { IsInt, MinLength } from 'class-validator';

@InputType()
export class RegistrationInput {
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
  @Field(() => String, {
    nullable: false,
  })
  @MinLength(8, { message: 'validation-error.PASSWORD' })
  password: string;
}

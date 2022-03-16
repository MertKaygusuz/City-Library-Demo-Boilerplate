import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  memberName: string;
  @Field(() => String, { nullable: false })
  password: string;
}

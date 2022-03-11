import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

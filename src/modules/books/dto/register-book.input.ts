import { Field, InputType, Int } from '@nestjs/graphql';
import { BookCoverTypes } from 'src/common/enums/book-cover-types';
import { BookTitleTypes } from 'src/common/enums/book-title-types';

@InputType()
export class RegisterBookInput {
  @Field(() => String, {
    nullable: false,
  })
  authorName: string;
  @Field(() => String, {
    nullable: false,
  })
  bookTitle: string;
  @Field(() => Int, {
    description: 'Publish date in epoch milliseconds',
    nullable: false,
  })
  firstPublishDate: number;
  @Field(() => Int, {
    nullable: false,
  })
  editionNumber: number;
  @Field(() => Int, {
    description: 'Edition date in epoch milliseconds',
    nullable: false,
  })
  editionDate: number;
  @Field(() => Int, {
    nullable: false,
  })
  titleType: BookTitleTypes;
  @Field(() => Int, {
    nullable: false,
  })
  coverType: BookCoverTypes;
  @Field(() => Int, {
    nullable: false,
  })
  availableCount: number;
}

import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
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
  @Field(() => Float, {
    description: 'Publish date in epoch milliseconds',
    nullable: false,
  })
  @IsInt({ message: 'validation-error.DATE' })
  firstPublishDate: number;
  @Field(() => Int, {
    nullable: false,
  })
  editionNumber: number;
  @Field(() => Float, {
    description: 'Edition date in epoch milliseconds',
    nullable: false,
  })
  @IsInt({ message: 'validation-error.DATE' })
  editionDate: number;
  @Field(() => Int, {
    nullable: false,
  })
  @IsEnum(BookTitleTypes, { message: 'validation-error.BOOK_TITLE_TYPE' })
  titleType: BookTitleTypes;
  @Field(() => Int, {
    nullable: false,
  })
  @IsEnum(BookCoverTypes, { message: 'validation-error.BOOK_COVER_TYPE' })
  coverType: BookCoverTypes;
  @Field(() => Int, {
    nullable: false,
  })
  availableCount: number;
  @Field(() => Int, {
    nullable: false,
  })
  reservedCount: number;
}

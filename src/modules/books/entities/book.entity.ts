import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BookCoverTypes } from 'src/common/enums/book-cover-types';
import { BookTitleTypes } from 'src/common/enums/book-title-types';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { AfterLoad, Column, Entity } from 'typeorm';

@Entity('Books')
@ObjectType()
export class Book extends BaseEntityModel<string> {
  @Column()
  @Field(() => String)
  authorName: string;

  @Column()
  @Field(() => String)
  bookTitle: string;

  @Column()
  @Field(() => Float, {
    description: 'Edition date in epoch milliseconds',
  })
  firstPublishedDate: number;

  @Column()
  @Field(() => Int)
  editionNumber: number;

  @Column()
  @Field(() => Float, {
    description: 'Edition date in epoch milliseconds',
  })
  editionDate: number;

  @Column()
  @Field(() => Int)
  availableCount: number;

  @Column()
  @Field(() => Int)
  reservedCount: number;

  @Field(() => Int)
  @Column('int')
  titleType: BookTitleTypes;

  @Field(() => Int)
  @Column('int')
  coverType: BookCoverTypes;

  @Field(() => String)
  bookId: string;

  @AfterLoad()
  getBookIdField() {
    this.bookId = this._id;
  }
}

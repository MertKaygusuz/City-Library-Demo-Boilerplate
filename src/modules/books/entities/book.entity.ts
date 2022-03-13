import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookCoverTypes } from 'src/common/enums/book-cover-types';
import { BookTitleTypes } from 'src/common/enums/book-title-types';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { AfterLoad, Column, Entity } from 'typeorm';

@Entity('Books')
@ObjectType()
export class Book extends BaseEntityModel<string> {
  @Column()
  @Field(() => String, {
    nullable: false,
  })
  authorName: string;

  @Column()
  @Field(() => String, {
    nullable: false,
  })
  bookTitle: string;

  @Column()
  @Field(() => Int, {
    description: 'Edition date in epoch milliseconds',
    nullable: false,
  })
  firstPublishedDate: number;

  @Column()
  @Field(() => Int, {
    nullable: false,
  })
  editionNumber: number;

  @Column()
  @Field(() => Int, {
    description: 'Edition date in epoch milliseconds',
    nullable: false,
  })
  editionDate: number;

  @Column()
  @Field(() => Int, {
    nullable: false,
  })
  availableCount: number;

  @Column()
  @Field(() => Int, {
    nullable: false,
  })
  reservedCount: number;

  @Field(() => Int, {
    nullable: false,
  })
  @Column('int')
  titleType: BookTitleTypes;

  @Field(() => Int, {
    nullable: false,
  })
  @Column('int')
  coverType: BookCoverTypes;

  @Field(() => String, {
    nullable: false,
  })
  bookId: string;

  @AfterLoad()
  getBookIdField() {
    this.bookId = this._id;
  }
}

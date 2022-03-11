import { BookCoverTypes } from 'src/common/enums/book-cover-types';
import { BookTitleTypes } from 'src/common/enums/book-title-types';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { Column, Entity } from 'typeorm';

@Entity('Books')
export class Book extends BaseEntityModel<string> {
  @Column()
  authorName: string;
  @Column()
  bookTitle: string;
  @Column()
  firstPublishedDate: number;
  @Column()
  editionNumber: number;
  @Column()
  editionDate: number;
  @Column()
  availableCount: number;
  @Column()
  reservedCount: number;
  @Column('int')
  titleType: BookTitleTypes;
  @Column('int')
  coverType: BookCoverTypes;
}

import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { Entity, Column, Index } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('BookReservationHistories')
export class BookReservationHistory extends BaseEntityModel<string> {
  @Column()
  receivedDate: number;
  @Column()
  returnDate: number;
  @Index()
  @Column()
  memberId: ObjectID;
  @Index()
  @Column()
  bookId: ObjectID;
}

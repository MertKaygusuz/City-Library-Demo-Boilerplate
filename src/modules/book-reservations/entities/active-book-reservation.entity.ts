import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { addDaysToEpochTime } from 'src/utils/functions/date-time';
import { AfterLoad, Column, Entity, Index } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('ActiveBookReservations')
export class ActiveBookReservation extends BaseEntityModel<string> {
  @Column()
  receivedDate: number;
  @Index()
  @Column()
  memberId: ObjectID;
  @Index()
  @Column()
  bookId: ObjectID;

  availableAt: number;

  @AfterLoad()
  getAvailabeAt() {
    this.availableAt = addDaysToEpochTime(this.receivedDate, 7);
  }
}

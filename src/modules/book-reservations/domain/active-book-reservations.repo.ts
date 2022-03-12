import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MongoRepository, Repository } from 'typeorm';
import { ActiveBookReservation } from '../entities/active-book-reservation.entity';
import { IActiveBookReservationsRepo } from './active-book-reservations.repo.interface';

@Injectable()
export class ActiveBookReservationsRepo
  extends BaseRepository<ActiveBookReservation, string>
  implements IActiveBookReservationsRepo
{
  constructor(
    @InjectRepository(ActiveBookReservation)
    private readonly activeBookReservationsMongoRepository: MongoRepository<ActiveBookReservation>,
  ) {
    super(
      activeBookReservationsMongoRepository as Repository<ActiveBookReservation>,
    );
  }
}

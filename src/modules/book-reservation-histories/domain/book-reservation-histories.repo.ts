import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MongoRepository, Repository } from 'typeorm';
import { BookReservationHistory } from '../entities/book-reservation-history.entity';
import { IBookReservationHistoriesRepo } from './book-reservation-histories.repo.interface';

@Injectable()
export class BookReservationHistoriesRepo
  extends BaseRepository<BookReservationHistory, string>
  implements IBookReservationHistoriesRepo
{
  constructor(
    @InjectRepository(BookReservationHistory)
    private readonly bookReservationHistoriesMongoRepository: MongoRepository<BookReservationHistory>,
  ) {
    super(
      bookReservationHistoriesMongoRepository as Repository<BookReservationHistory>,
    );
  }
}

import { Module } from '@nestjs/common';
import { BookReservationsService } from './book-reservations.service';
import { ActiveBookReservationsResolver } from './active-book-reservations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { BookReservationHistoriesRepo } from './domain/book-reservation-histories.repo';
import { Book_Reservation_Histories_Repo } from './domain/book-reservation-histories.repo.interface';
import { BookReservationHistory } from './entities/book-reservation-history.entity';
import { ActiveBookReservationsRepo } from './domain/active-book-reservations.repo';
import { Active_Reservations_Repo } from './domain/active-book-reservations.repo.interface';
import { ActiveBookReservation } from './entities/active-book-reservation.entity';
import { BooksModule } from '../books/books.module';
import { MembersModule } from '../members/members.module';
import { BookReservationHistoriesResolver } from './book-reservation-histories.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookReservationHistory, ActiveBookReservation]),
    BaseRepository,
    BooksModule,
    MembersModule,
  ],
  providers: [
    {
      provide: Book_Reservation_Histories_Repo,
      useClass: BookReservationHistoriesRepo,
    },
    {
      provide: Active_Reservations_Repo,
      useClass: ActiveBookReservationsRepo,
    },
    ActiveBookReservationsResolver,
    BookReservationHistoriesResolver,
    BookReservationsService,
  ],
  exports: [Book_Reservation_Histories_Repo, Active_Reservations_Repo], //exporting repos for seeding in app controller
})
export class BookReservationsModule {}

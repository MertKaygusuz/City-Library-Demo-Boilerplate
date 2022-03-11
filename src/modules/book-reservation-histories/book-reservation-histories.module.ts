import { Module } from '@nestjs/common';
import { BookReservationHistoriesService } from './book-reservation-histories.service';
import { BookReservationHistoriesResolver } from './book-reservation-histories.resolver';
import { Book_Reservation_Histories_Repo } from './domain/book-reservation-histories.repo.interface';
import { BookReservationHistoriesRepo } from './domain/book-reservation-histories.repo';
import { BookReservationHistory } from './entities/book-reservation-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';

@Module({
  imports: [TypeOrmModule.forFeature([BookReservationHistory]), BaseRepository],
  providers: [
    {
      provide: Book_Reservation_Histories_Repo,
      useClass: BookReservationHistoriesRepo,
    },
    BookReservationHistoriesResolver,
    BookReservationHistoriesService,
  ],
})
export class BookReservationHistoriesModule {}

import { Module } from '@nestjs/common';
import { ActiveBookReservationsService } from './active-book-reservations.service';
import { ActiveBookReservationsResolver } from './active-book-reservations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveBookReservation } from './entities/active-book-reservation.entity';
import { BaseRepository } from 'src/domain-base/base-repo';
import { ActiveBookReservationsRepo } from './domain/active-book-reservations.repo';
import { Active_Reservations_Repo } from './domain/active-book-reservations.repo.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveBookReservation]), BaseRepository],
  providers: [
    {
      provide: Active_Reservations_Repo,
      useClass: ActiveBookReservationsRepo,
    },
    ActiveBookReservationsResolver,
    ActiveBookReservationsService,
  ],
})
export class ActiveBookReservationsModule {}

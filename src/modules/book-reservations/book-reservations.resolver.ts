import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookReservationsService } from './book-reservations.service';
import { BookReservation } from './entities/book-reservation.entity';

@Resolver(() => BookReservation)
export class BookReservationsResolver {
  constructor(
    private readonly bookReservationsService: BookReservationsService,
  ) {}
}

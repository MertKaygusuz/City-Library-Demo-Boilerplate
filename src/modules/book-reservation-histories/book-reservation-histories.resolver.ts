import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookReservationHistoriesService } from './book-reservation-histories.service';
import { BookReservationHistory } from './entities/book-reservation-history.entity';
import { CreateBookReservationHistoryInput } from './dto/create-book-reservation-history.input';
import { UpdateBookReservationHistoryInput } from './dto/update-book-reservation-history.input';

//@Resolver(() => BookReservationHistory)
export class BookReservationHistoriesResolver {
  constructor(
    private readonly bookReservationHistoriesService: BookReservationHistoriesService,
  ) {}

  //@Mutation(() => BookReservationHistory)
  createBookReservationHistory(
    @Args('createBookReservationHistoryInput')
    createBookReservationHistoryInput: CreateBookReservationHistoryInput,
  ) {
    return this.bookReservationHistoriesService.create(
      createBookReservationHistoryInput,
    );
  }

  //@Query(() => [BookReservationHistory], { name: 'bookReservationHistories' })
  findAll() {
    return this.bookReservationHistoriesService.findAll();
  }

  //@Query(() => BookReservationHistory, { name: 'bookReservationHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookReservationHistoriesService.findOne(id);
  }

  //@Mutation(() => BookReservationHistory)
  updateBookReservationHistory(
    @Args('updateBookReservationHistoryInput')
    updateBookReservationHistoryInput: UpdateBookReservationHistoryInput,
  ) {
    return this.bookReservationHistoriesService.update(
      updateBookReservationHistoryInput.id,
      updateBookReservationHistoryInput,
    );
  }

  //@Mutation(() => BookReservationHistory)
  removeBookReservationHistory(@Args('id', { type: () => Int }) id: number) {
    return this.bookReservationHistoriesService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateBookReservationHistoryInput } from './dto/create-book-reservation-history.input';
import { UpdateBookReservationHistoryInput } from './dto/update-book-reservation-history.input';

@Injectable()
export class BookReservationHistoriesService {
  create(createBookReservationHistoryInput: CreateBookReservationHistoryInput) {
    return 'This action adds a new bookReservationHistory';
  }

  findAll() {
    return `This action returns all bookReservationHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookReservationHistory`;
  }

  update(id: number, updateBookReservationHistoryInput: UpdateBookReservationHistoryInput) {
    return `This action updates a #${id} bookReservationHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookReservationHistory`;
  }
}

import { IBaseRepository } from 'src/domain-base/base-repo.interface';
import { BookReservationHistory } from '../entities/book-reservation-history.entity';

export const Book_Reservation_Histories_Repo =
  'Book Reservation Histories Repository';

export interface IBookReservationHistoriesRepo
  extends IBaseRepository<BookReservationHistory, string> {}

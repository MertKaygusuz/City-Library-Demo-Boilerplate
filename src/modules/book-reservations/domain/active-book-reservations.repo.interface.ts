import { IBaseRepository } from 'src/domain-base/base-repo.interface';
import { ActiveBookReservation } from '../entities/active-book-reservation.entity';

export const Active_Reservations_Repo = 'Active Book Reservations Repository';

export interface IActiveBookReservationsRepo
  extends IBaseRepository<ActiveBookReservation, string> {}

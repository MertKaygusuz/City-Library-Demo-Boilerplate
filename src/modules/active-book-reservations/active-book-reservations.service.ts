import { Injectable } from '@nestjs/common';
import { CreateActiveBookReservationInput } from './dto/create-active-book-reservation.input';
import { UpdateActiveBookReservationInput } from './dto/update-active-book-reservation.input';

@Injectable()
export class ActiveBookReservationsService {
  create(createActiveBookReservationInput: CreateActiveBookReservationInput) {
    return 'This action adds a new activeBookReservation';
  }

  findAll() {
    return `This action returns all activeBookReservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activeBookReservation`;
  }

  update(id: number, updateActiveBookReservationInput: UpdateActiveBookReservationInput) {
    return `This action updates a #${id} activeBookReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} activeBookReservation`;
  }
}

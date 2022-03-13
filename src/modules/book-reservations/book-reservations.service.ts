import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';
import {
  Active_Reservations_Repo,
  IActiveBookReservationsRepo,
} from './domain/active-book-reservations.repo.interface';
import {
  Book_Reservation_Histories_Repo,
  IBookReservationHistoriesRepo,
} from './domain/book-reservation-histories.repo.interface';
import { ReservationHistoryResponseDto } from './dto/reservation-history.response.dto';
import { BookReservationHistory } from './entities/book-reservation-history.entity';
import { ObjectID } from 'mongodb';
import { ActiveBookReservationsFilterInput } from './dto/active-book-reservations.filter.input';
import { ActiveBookReservation } from './entities/active-book-reservation.entity';
import { ActiveBookReservationsResponseDto } from './dto/active-book-reservations.response.dto';
import { NumberOfBooksReservedByMembersResponseDto } from './dto/number-of-books-reserved-by-members.response.dto';
import { AssigningBookInput } from './dto/assigning-book.input';
import { BooksService } from '../books/books.service';
import { MembersService } from '../members/members.service';

@Injectable()
export class BookReservationsService {
  constructor(
    @Inject(Active_Reservations_Repo)
    private readonly activeBookReservationsRepo: IActiveBookReservationsRepo,
    @Inject(Book_Reservation_Histories_Repo)
    private readonly bookReservationHistoriesRepo: IBookReservationHistoriesRepo,
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  async getReservationHistoriesByBookId(
    bookId: string,
  ): Promise<ReservationHistoryResponseDto[]> {
    const bookIdKey = nameof<BookReservationHistory>((x) => x.bookId);
    const bookHistories =
      await this.bookReservationHistoriesRepo.findWithOptions({
        where: { [bookIdKey]: new ObjectID(bookId) },
      });

    const returnValue =
      bookHistories as unknown as ReservationHistoryResponseDto[];

    return returnValue;
  }

  async getReservationHistoriesByMemberId(
    memberId: string,
  ): Promise<ReservationHistoryResponseDto[]> {
    const memberIdKey = nameof<BookReservationHistory>((x) => x.memberId);
    const bookHistories =
      await this.bookReservationHistoriesRepo.findWithOptions({
        where: { [memberIdKey]: new ObjectID(memberId) },
      });

    const returnValue = bookHistories as ReservationHistoryResponseDto[];

    return returnValue;
  }

  async getAllActiveBookReservations(
    input: ActiveBookReservationsFilterInput,
  ): Promise<ActiveBookReservationsResponseDto[]> {
    const bookIdKey = nameof<ActiveBookReservation>((x) => x.bookId);
    const memberIdKey = nameof<ActiveBookReservation>((x) => x.memberId);
    const whereQuery = {};
    if (input.bookId) whereQuery[bookIdKey] = new ObjectID(input.bookId);
    if (input.memberId) whereQuery[memberIdKey] = new ObjectID(input.memberId);

    const activeReservations =
      await this.activeBookReservationsRepo.findWithOptions({
        where: whereQuery,
        order: { createdAt: 'DESC' },
      });

    const returnValue =
      activeReservations as ActiveBookReservationsResponseDto[];

    return returnValue;
  }

  async getNumberOfBooksReservedPerMembers(): Promise<
    NumberOfBooksReservedByMembersResponseDto[]
  > {
    const rawResult =
      await this.activeBookReservationsRepo.getNumberOfBooksReservedPerMembers();
    return rawResult as NumberOfBooksReservedByMembersResponseDto[];
  }

  async getReservedBooksEstimatedReturnDates(
    bookId: string,
  ): Promise<number[]> {
    const rawResult = await this.activeBookReservationsRepo.findWithOptions({
      where: {
        [nameof<ActiveBookReservation>((x) => x.bookId)]: new ObjectID(bookId),
      },
      select: ['receivedDate'], //we use only available at field. However, it is computed after loading on the basis of recievedDate
    });

    return rawResult.map((x) => x.availableAt).sort();
  }

  private async memberExistanceCheck(memberId: string) {
    const doesMemberExist = await this.membersService.doesMemberExist(memberId);
    if (!doesMemberExist)
      throw new NotFoundException('Member could not be found');
  }

  async assignBookToMember(assigningBookInput: AssigningBookInput) {
    await this.memberExistanceCheck(assigningBookInput.memberId);
    await this.booksService.updateForReservation(assigningBookInput.bookId);
    const newReservationRecord = new ActiveBookReservation();
    newReservationRecord.bookId = new ObjectID(assigningBookInput.bookId);
    newReservationRecord.memberId = new ObjectID(assigningBookInput.memberId);
    newReservationRecord.receivedDate = Date.now();
    await this.activeBookReservationsRepo.create(newReservationRecord);
  }

  async unAssignBookToMember(assigningBookInput: AssigningBookInput) {
    //get first record on the basis of receivedDate
    const activeReservation =
      await this.activeBookReservationsRepo.findWithOptions({
        where: {
          [nameof<ActiveBookReservation>((x) => x.bookId)]: new ObjectID(
            assigningBookInput.bookId,
          ),
          [nameof<ActiveBookReservation>((x) => x.memberId)]: new ObjectID(
            assigningBookInput.memberId,
          ),
          [nameof<ActiveBookReservation>((x) => x.isDeleted)]: false,
        },
        select: ['_id', 'receivedDate'],
        order: { receivedDate: 'ASC' },
        skip: 0,
        take: 1,
      });

    if (
      !activeReservation ||
      !activeReservation[0] ||
      !activeReservation[0]._id
    )
      throw new NotFoundException(
        'Active book reservation could not be found.',
      );
    await this.memberExistanceCheck(assigningBookInput.memberId);
    await this.booksService.updateForDispose(assigningBookInput.bookId);
    const newHistoryRecord = new BookReservationHistory();
    newHistoryRecord.bookId = new ObjectID(assigningBookInput.bookId);
    newHistoryRecord.memberId = new ObjectID(assigningBookInput.memberId);
    newHistoryRecord.receivedDate = activeReservation[0].receivedDate;
    newHistoryRecord.returnDate = Date.now();
    await this.bookReservationHistoriesRepo.create(newHistoryRecord);
    await this.activeBookReservationsRepo.deleteById(activeReservation[0]._id);
  }
}

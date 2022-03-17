import { Inject, Injectable } from '@nestjs/common';
import { BookCoverTypes } from './common/enums/book-cover-types';
import { BookTitleTypes } from './common/enums/book-title-types';
import {
  Active_Reservations_Repo,
  IActiveBookReservationsRepo,
} from './modules/book-reservations/domain/active-book-reservations.repo.interface';
import {
  Book_Reservation_Histories_Repo,
  IBookReservationHistoriesRepo,
} from './modules/book-reservations/domain/book-reservation-histories.repo.interface';
import { ActiveBookReservation } from './modules/book-reservations/entities/active-book-reservation.entity';
import { BookReservationHistory } from './modules/book-reservations/entities/book-reservation-history.entity';
import {
  Book_Repo,
  IBooksRepo,
} from './modules/books/domain/books.interface.repo';
import { Book } from './modules/books/entities/book.entity';
import {
  Member_Repo,
  IMembersRepo,
} from './modules/members/domain/members.interface.repo';
import {
  Role_Repo,
  IRolesRepo,
} from './modules/members/domain/roles.interface.repo';
import { Member } from './modules/members/entities/member.entity';
import { Role } from './modules/members/entities/role.entity';
import {
  addYearsToEpochTime,
  addDaysToEpochTime,
} from './utils/functions/date-time';
import { createPasswordHash } from './utils/functions/password-related';

@Injectable()
export class AppService {
  constructor(
    @Inject(Member_Repo)
    private readonly membersRepo: IMembersRepo,
    @Inject(Role_Repo)
    private readonly rolesRepo: IRolesRepo,
    @Inject(Book_Repo)
    private readonly booksRepo: IBooksRepo,
    @Inject(Active_Reservations_Repo)
    private readonly activeBookReservationsRepo: IActiveBookReservationsRepo,
    @Inject(Book_Reservation_Histories_Repo)
    private readonly bookReservationsHistoriesRepo: IBookReservationHistoriesRepo,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async seedData() {
    const role1 = new Role();
    const role2 = new Role();
    role1.roleName = 'Admin';
    role2.roleName = 'User';
    await this.rolesRepo.insertMany([role1, role2]);

    const sharedPassword = '1234567890';
    const hashedPassword = createPasswordHash(sharedPassword);
    const dateNow = Date.now();
    const members: Array<Member> = [
      {
        memberName: 'Admin',
        fullName: 'Admin',
        birthDate: addYearsToEpochTime(dateNow, -30),
        address: "Admin's address",
        password: hashedPassword,
        roles: [role1, role2],
        createdAt: dateNow,
        isDeleted: false,
      } as Member,
      {
        memberName: 'User1',
        fullName: 'Orhan',
        birthDate: addYearsToEpochTime(dateNow, -30),
        address: "Orhan's address",
        password: hashedPassword,
        roles: [role2],
        createdAt: dateNow,
        isDeleted: false,
      } as Member,
      {
        memberName: 'User2',
        fullName: 'Kaya',
        birthDate: addYearsToEpochTime(dateNow, -40),
        address: "Kaya's address",
        password: hashedPassword,
        roles: [role2],
        createdAt: dateNow,
        isDeleted: false,
      } as Member,
      {
        memberName: 'User3',
        fullName: 'Kadriye',
        birthDate: addYearsToEpochTime(dateNow, -20),
        address: "Kadriye's address",
        password: hashedPassword,
        roles: [role2],
        createdAt: dateNow,
        isDeleted: false,
      } as Member,
      {
        memberName: 'User4',
        fullName: 'Ömür Törpüsü',
        birthDate: addYearsToEpochTime(dateNow, -50),
        address: "Ömür's address",
        password: hashedPassword,
        roles: [role2],
        createdAt: dateNow,
        isDeleted: false,
      } as Member,
    ];

    await this.membersRepo.insertMany(members);

    const books: Array<Book> = [
      {
        bookTitle: 'Ailenin, Devletin ve Özel Mülkiyetin Kökeni',
        authorName: 'Friedrich Engels',
        firstPublishedDate: addYearsToEpochTime(dateNow, -138),
        editionNumber: 4,
        editionDate: addYearsToEpochTime(dateNow, -120),
        titleType: BookTitleTypes.SCIENCE,
        coverType: BookCoverTypes.HARDCOVER,
        availableCount: 3,
        reservedCount: 1,
        createdAt: dateNow,
        isDeleted: false,
      } as Book,
      {
        bookTitle: 'Beyoğlu Rapsodisi',
        authorName: 'Ahmet Ümit',
        firstPublishedDate: addYearsToEpochTime(dateNow, -19),
        editionNumber: 4,
        editionDate: addYearsToEpochTime(dateNow, -5),
        titleType: BookTitleTypes.LITERATURE,
        coverType: BookCoverTypes.HARDCOVER,
        availableCount: 4,
        reservedCount: 2,
        createdAt: dateNow,
        isDeleted: false,
      } as Book,
      {
        bookTitle: 'Beyoğlu Rapsodisi',
        authorName: 'Ahmet Ümit',
        firstPublishedDate: addYearsToEpochTime(dateNow, -19),
        editionNumber: 3,
        editionDate: addYearsToEpochTime(dateNow, -10),
        titleType: BookTitleTypes.LITERATURE,
        coverType: BookCoverTypes.HARDCOVER,
        availableCount: 3,
        reservedCount: 0,
        createdAt: dateNow,
        isDeleted: false,
      } as Book,
      {
        bookTitle: "Thomas' Calculus",
        authorName: 'George Brinton Thomas',
        firstPublishedDate: addYearsToEpochTime(dateNow, -70),
        editionNumber: 13,
        editionDate: addYearsToEpochTime(dateNow, -5),
        titleType: BookTitleTypes.MATH,
        coverType: BookCoverTypes.SOFTCOVER,
        availableCount: 500,
        reservedCount: 0,
        createdAt: dateNow,
        isDeleted: false,
      } as Book,
      {
        bookTitle: "Thomas' Calculus",
        authorName: 'George Brinton Thomas',
        firstPublishedDate: addYearsToEpochTime(dateNow, -70),
        editionNumber: 13,
        editionDate: addYearsToEpochTime(dateNow, -5),
        titleType: BookTitleTypes.MATH,
        coverType: BookCoverTypes.HARDCOVER,
        availableCount: 50,
        reservedCount: 0,
        createdAt: dateNow,
        isDeleted: false,
      } as Book,
    ];

    await this.booksRepo.insertMany(books);

    const activeBookReservations: Array<ActiveBookReservation> = [
      {
        receivedDate: addDaysToEpochTime(dateNow, -4),
        memberId: members[2]._id,
        bookId: books[0]._id,
        createdAt: dateNow,
        isDeleted: false,
      } as ActiveBookReservation,
      {
        receivedDate: addDaysToEpochTime(dateNow, -2),
        memberId: members[2]._id,
        bookId: books[1]._id,
        createdAt: dateNow,
        isDeleted: false,
      } as ActiveBookReservation,
      {
        receivedDate: addDaysToEpochTime(dateNow, -6),
        memberId: members[1]._id,
        bookId: books[1]._id,
        createdAt: dateNow,
        isDeleted: false,
      } as ActiveBookReservation,
    ];

    await this.activeBookReservationsRepo.insertMany(activeBookReservations);

    const bookReservationHistories: Array<BookReservationHistory> = [
      {
        bookId: books[0]._id,
        memberId: members[3]._id,
        receivedDate: addDaysToEpochTime(dateNow, -40),
        returnDate: addDaysToEpochTime(dateNow, -20),
        createdAt: dateNow,
        isDeleted: false,
      } as BookReservationHistory,
      {
        bookId: books[1]._id,
        memberId: members[3]._id,
        receivedDate: addDaysToEpochTime(dateNow, -12),
        returnDate: addDaysToEpochTime(dateNow, -3),
        createdAt: dateNow,
        isDeleted: false,
      } as BookReservationHistory,
      {
        bookId: books[4]._id,
        memberId: members[1]._id,
        receivedDate: addDaysToEpochTime(dateNow, -22),
        returnDate: addDaysToEpochTime(dateNow, -13),
        createdAt: dateNow,
        isDeleted: false,
      } as BookReservationHistory,
      {
        bookId: books[4]._id,
        memberId: members[2]._id,
        receivedDate: addDaysToEpochTime(dateNow, -120),
        returnDate: addDaysToEpochTime(dateNow, -100),
        createdAt: dateNow,
        isDeleted: false,
      } as BookReservationHistory,
    ];

    await this.bookReservationsHistoriesRepo.insertMany(
      bookReservationHistories,
    );
  }

  async deleteAllData() {
    await Promise.all([
      this.membersRepo.delete({}),
      this.rolesRepo.delete({}),
      this.booksRepo.delete({}),
      this.activeBookReservationsRepo.delete({}),
      this.bookReservationsHistoriesRepo.delete({}),
    ]);
  }
}

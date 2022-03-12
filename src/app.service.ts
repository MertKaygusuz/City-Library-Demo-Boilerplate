import { Inject, Injectable } from '@nestjs/common';
import { BookCoverTypes } from './common/enums/book-cover-types';
import { BookTitleTypes } from './common/enums/book-title-types';
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
import { addYearsToEpochTime } from './utils/functions/date-time';
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
    ];

    await this.membersRepo.insertMany(members);

    const books: Array<Book> = [
      {
        bookTitle: 'Ailenin, Devletin ve Özel Mülkiyetin Kökeni',
        authorName: 'Friedrich Engels',
        firstPublishedDate: addYearsToEpochTime(dateNow, -138),
        editionNumber: 4,
        editionDate: addYearsToEpochTime(dateNow, -120),
        titleType: BookTitleTypes.Science,
        coverType: BookCoverTypes.HardCover,
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
        titleType: BookTitleTypes.Literature,
        coverType: BookCoverTypes.HardCover,
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
        titleType: BookTitleTypes.Literature,
        coverType: BookCoverTypes.HardCover,
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
        titleType: BookTitleTypes.Math,
        coverType: BookCoverTypes.SoftCover,
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
        titleType: BookTitleTypes.Math,
        coverType: BookCoverTypes.HardCover,
        availableCount: 50,
        reservedCount: 0,
        createdAt: dateNow,
        isDeleted: false,
      } as Book,
    ];

    await this.booksRepo.insertMany(books);
  }

  async deleteAllData() {
    await Promise.all([
      this.membersRepo.delete({}),
      this.rolesRepo.delete({}),
      this.booksRepo.delete({}),
    ]);
  }
}

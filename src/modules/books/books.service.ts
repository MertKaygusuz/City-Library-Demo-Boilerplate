import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { ObjectID } from 'mongodb';
import { GlobalExceptionFilter } from 'src/filters/global-exception-filter';
import {
  CustomException,
  CustomExceptionBase,
} from 'src/filters/models/custom-exception';
import {
  ValidationExceptionBase,
  ValidationExceptions,
} from 'src/filters/models/validation-exception';
import { ValidationFilter } from 'src/filters/validation-filter';
import { nameof } from 'ts-simple-nameof';
import { Book_Repo, IBooksRepo } from './domain/books.interface.repo';
import { RegisterBookInput } from './dto/register-book.input';
import { TotalAvailableCountsPerTitleEndEditionNumberResponseDto } from './dto/total-available-counts-per-title-end-edition-number.response.dto';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject(Book_Repo)
    private readonly booksRepo: IBooksRepo,
  ) {}
  async create(registerBookInput: RegisterBookInput): Promise<string> {
    const newBook = new Book();
    newBook.authorName = registerBookInput.authorName;
    newBook.bookTitle = registerBookInput.bookTitle;
    newBook.coverType = registerBookInput.coverType;
    newBook.editionDate = registerBookInput.editionDate;
    newBook.editionNumber = registerBookInput.editionNumber;
    newBook.firstPublishedDate = registerBookInput.firstPublishDate;
    newBook.titleType = registerBookInput.titleType;
    newBook.availableCount = registerBookInput.availableCount;
    await this.booksRepo.create(newBook);
    return newBook._id;
  }

  async findAll(): Promise<Book[]> {
    return await this.booksRepo.findWithOptions({
      where: { isDeleted: false },
    });
  }

  async updateForReservation(bookId: string) {
    const theBook = await this.booksRepo.findOne({
      _id: new ObjectID(bookId),
      isDeleted: false,
    });
    if (!theBook) throw new NotFoundException('Book could not be found!');
    if (theBook.availableCount < 1)
      throw new BadRequestException('Sorry! This book is not available now.');
    await this.booksRepo.updateById(bookId, {
      availableCount: theBook.availableCount - 1,
      reservedCount: theBook.reservedCount + 1,
    });
  }

  async updateForDispose(bookId: string) {
    const theBook = await this.booksRepo.findOne({
      _id: new ObjectID(bookId),
      isDeleted: false,
    });
    if (!theBook) throw new NotFoundException('Book could not be found!');
    await this.booksRepo.updateById(bookId, {
      availableCount: theBook.availableCount + 1,
      reservedCount: theBook.reservedCount - 1,
    });
  }

  async getBookById(id: string): Promise<Book> {
    return await this.booksRepo.findOneById(id);
  }

  async update(updateBookInput: UpdateBookInput) {
    const { id, ...updatedFields } = updateBookInput;
    const updateResult = await this.booksRepo.updateById(id, updatedFields);

    if (!updateResult.affected)
      throw new NotFoundException('Book could not be found!');
  }

  async remove(id: string) {
    // const error = new CustomExceptionBase(['Book could not be found!']);
    // throw new CustomException([error], '404');
    throw new BadRequestException('Book could not be found!');
    //throw new HttpException('f', 400);
    //throw new Error('abc');
    const updateResult = await this.booksRepo.deleteById(id);
    //throw new BadRequestException('Book could not be found!');
    //return new UserInputError('mee');
    if (!updateResult.affected) {
      const error = new CustomExceptionBase(['Book could not be found!']);
      throw new CustomException([error], '404');
    }
  }

  async getDistinctBookTitleNumber() {
    return await this.booksRepo.getDistinctNumberOfField(
      nameof<Book>((x) => x.bookTitle),
    );
  }

  async checkIfAnyAvailableBooks(bookId: string): Promise<boolean> {
    const book = await this.booksRepo.findWithOptions({
      where: { _id: new ObjectID(bookId) },
      select: ['availableCount'],
    });

    if (!book || !book[0]) return false;

    return book[0].availableCount > 0;
  }

  async getNumberOfBooksPerTitleAndEditionNumber(): Promise<
    TotalAvailableCountsPerTitleEndEditionNumberResponseDto[]
  > {
    const rawResult =
      await this.booksRepo.getNumberOfBooksPerTitleAndEditionNumber();
    return rawResult as TotalAvailableCountsPerTitleEndEditionNumberResponseDto[];
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';
import { Book_Repo, IBooksRepo } from './domain/books.interface.repo';
import { RegisterBookInput } from './dto/register-book.input';
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

  async update(updateBookInput: UpdateBookInput) {
    const { id, ...updatedFields } = updateBookInput;
    const updateResult = await this.booksRepo.updateById(id, updatedFields);

    if (!updateResult.affected)
      throw new NotFoundException('Book could not be found!');
  }

  async remove(id: string) {
    const updateResult = await this.booksRepo.deleteByIdSoftly(id);

    if (!updateResult.affected)
      throw new NotFoundException('Book could not be found!');
  }

  async getDistinctBookTitleNumber() {
    return await this.booksRepo.getDistinctNumberOfField(
      nameof<Book>((x) => x.bookTitle),
    );
  }
}

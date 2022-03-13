import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { UpdateBookInput } from './dto/update-book.input';
import { RegisterBookInput } from './dto/register-book.input';
import { TotalAvailableCountsPerTitleEndEditionNumberResponseDto } from './dto/total-available-counts-per-title-end-edition-number.response.dto';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => String)
  createBook(@Args('registerBookInput') registerBookInput: RegisterBookInput) {
    return this.booksService.create(registerBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => [TotalAvailableCountsPerTitleEndEditionNumberResponseDto])
  getNumberOfBooksPerTitleAndEditionNumber() {
    return this.booksService.getNumberOfBooksPerTitleAndEditionNumber();
  }

  @Query(() => Int)
  async getDistinctBookTitleNumber(): Promise<number> {
    return await this.booksService.getDistinctBookTitleNumber();
  }

  @Mutation(() => Boolean)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    await this.booksService.update(updateBookInput);
    return true;
  }

  @Mutation(() => Boolean, {
    description: 'Check with book id if there is available book',
  })
  async checkIfAnyAvailableBooks(
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.booksService.checkIfAnyAvailableBooks(id);
  }

  @Mutation(() => Boolean, {
    description: 'Soft delete operation for book records',
  })
  removeBook(@Args('id', { type: () => String }) id: string) {
    this.booksService.remove(id);
    return true;
  }
}

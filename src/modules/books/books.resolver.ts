import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { UpdateBookInput } from './dto/update-book.input';
import { RegisterBookInput } from './dto/register-book.input';
import { TotalAvailableCountsPerTitleEndEditionNumberResponseDto } from './dto/total-available-counts-per-title-end-edition-number.response.dto';
import { AuthRolesGuard } from '../auth/guards/auth-roles.guard';

@Resolver(() => Book)
@AuthRolesGuard('Admin')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => String, { description: 'returns registered book id' })
  async createBook(
    @Args('registerBookInput') registerBookInput: RegisterBookInput,
  ): Promise<string> {
    return await this.booksService.create(registerBookInput);
  }

  @Query(() => Boolean, {
    description: 'this is fake query for custom error exception handling test.',
  })
  customErrorExampleInBookService() {
    return this.booksService.customErrorExampleInBookService();
  }

  @Query(() => [Book], { name: 'books' })
  async findAll(): Promise<Book[]> {
    return await this.booksService.findAll();
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
  async removeBook(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    return await this.booksService.remove(id);
  }
}

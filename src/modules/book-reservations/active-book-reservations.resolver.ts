import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
  Float,
} from '@nestjs/graphql';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { MembersService } from '../members/members.service';
import { BookReservationsService } from './book-reservations.service';
import { ActiveBookReservationsFilterInput } from './dto/active-book-reservations.filter.input';
import { ActiveBookReservationsResponseDto } from './dto/active-book-reservations.response.dto';
import { NumberOfBooksReservedByMembersResponseDto } from './dto/number-of-books-reserved-by-members.response.dto';

@Resolver(() => ActiveBookReservationsResponseDto)
export class ActiveBookReservationsResolver {
  constructor(
    private readonly bookReservationsService: BookReservationsService,
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  @Query(() => [ActiveBookReservationsResponseDto])
  async getAllActiveBookReservations(
    @Args('activeBookReservationsFilterInput')
    activeBookReservationsFilterInput: ActiveBookReservationsFilterInput,
  ): Promise<ActiveBookReservationsResponseDto[]> {
    return await this.bookReservationsService.getAllActiveBookReservations(
      activeBookReservationsFilterInput,
    );
  }

  @Query(() => [NumberOfBooksReservedByMembersResponseDto])
  async getNumberOfBooksReservedPerMembers(): Promise<
    NumberOfBooksReservedByMembersResponseDto[]
  > {
    return await this.bookReservationsService.getNumberOfBooksReservedPerMembers();
  }

  @Query(() => [Float])
  async getReservedBooksEstimatedReturnDates(
    @Args('bookId', { type: () => String, nullable: false }) bookId: string,
  ): Promise<number[]> {
    return await this.bookReservationsService.getReservedBooksEstimatedReturnDates(
      bookId,
    );
  }

  @ResolveField(() => Book)
  async getBookInfo(
    @Parent() bookReservations: ActiveBookReservationsResponseDto,
  ): Promise<Book> {
    return await this.booksService.getBookById(bookReservations.bookId);
  }

  @ResolveField(() => Member)
  async getMemberInfo(
    @Parent() bookReservations: ActiveBookReservationsResponseDto,
  ): Promise<Member> {
    return await this.membersService.getMembersByMemberId(
      bookReservations.memberId,
    );
  }
}

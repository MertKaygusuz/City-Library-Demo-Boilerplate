import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { BooksService } from '../books/books.service';
import { Book } from '../books/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { MembersService } from '../members/members.service';
import { BookReservationsService } from './book-reservations.service';
import { ReservationHistoryResponseDto } from './dto/reservation-history.response.dto';

@Resolver(() => ReservationHistoryResponseDto)
export class BookReservationHistoriesResolver {
  constructor(
    private readonly bookReservationsService: BookReservationsService,
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  @Query(() => [ReservationHistoryResponseDto])
  async getReservationHistoriesByBookId(
    @Args('bookId', { type: () => String, nullable: false }) bookId: string,
  ): Promise<ReservationHistoryResponseDto[]> {
    return await this.bookReservationsService.getReservationHistoriesByBookId(
      bookId,
    );
  }

  @Query(() => [ReservationHistoryResponseDto])
  async getReservationHistoriesByMemberId(
    @Args('memberId', { type: () => String, nullable: false }) memberId: string,
  ): Promise<ReservationHistoryResponseDto[]> {
    return await this.bookReservationsService.getReservationHistoriesByMemberId(
      memberId,
    );
  }

  @ResolveField(() => Book)
  async getBookInfo(
    @Parent() bookReservationHitory: ReservationHistoryResponseDto,
  ): Promise<Book> {
    return await this.booksService.getBookById(bookReservationHitory.bookId);
  }

  @ResolveField(() => Member)
  async getMemberInfo(
    @Parent() bookReservationHitory: ReservationHistoryResponseDto,
  ): Promise<Member> {
    return await this.membersService.getMembersByMemberId(
      bookReservationHitory.memberId,
    );
  }
}

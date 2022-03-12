import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './modules/members/members.module';
import { BooksModule } from './modules/books/books.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveBookReservation } from './modules/book-reservations/entities/active-book-reservation.entity';
import { BookReservationHistory } from './modules/book-reservations/entities/book-reservation-history.entity';
import { Book } from './modules/books/entities/book.entity';
import { Member } from './modules/members/entities/member.entity';
import { Role } from './modules/members/entities/role.entity';
import { BookReservationsModule } from './modules/book-reservations/book-reservations.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_CONNECTION,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        ActiveBookReservation,
        BookReservationHistory,
        Book,
        Member,
        Role,
      ],
    }),
    MembersModule,
    BooksModule,
    BookReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

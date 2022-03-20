import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { BooksRepo } from './domain/books.repo';
import { Book } from './entities/book.entity';
import { Book_Repo } from './domain/books.interface.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), BaseRepository],
  providers: [
    {
      provide: Book_Repo,
      useClass: BooksRepo,
    },
    BooksResolver,
    BooksService,
  ],
  exports: [Book_Repo, BooksService], //exporting repos for seeding in app controller
})
export class BooksModule {}

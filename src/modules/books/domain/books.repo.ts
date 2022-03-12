import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MongoRepository, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { IBooksRepo } from './books.interface.repo';

@Injectable()
export class BooksRepo
  extends BaseRepository<Book, string>
  implements IBooksRepo
{
  constructor(
    @InjectRepository(Book)
    private readonly bookMongoRepository: MongoRepository<Book>,
  ) {
    super(bookMongoRepository as Repository<Book>);
  }

  async getDistinctNumberOfField(field: string): Promise<number> {
    const result = await this.bookMongoRepository.distinct(field, {});
    return result.length;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { Book } from 'src/modules/books/entities/book.entity';
import { Member } from 'src/modules/members/entities/member.entity';
import { nameof } from 'ts-simple-nameof';
import { MongoRepository, Repository } from 'typeorm';
import { ActiveBookReservation } from '../entities/active-book-reservation.entity';
import { IActiveBookReservationsRepo } from './active-book-reservations.repo.interface';

@Injectable()
export class ActiveBookReservationsRepo
  extends BaseRepository<ActiveBookReservation, string>
  implements IActiveBookReservationsRepo
{
  constructor(
    @InjectRepository(ActiveBookReservation)
    private readonly activeBookReservationsMongoRepository: MongoRepository<ActiveBookReservation>,
  ) {
    super(
      activeBookReservationsMongoRepository as Repository<ActiveBookReservation>,
    );
  }

  async getNumberOfBooksReservedPerMembers() {
    const memberIdKey = '$' + nameof<ActiveBookReservation>((x) => x.memberId);
    const result = this.activeBookReservationsMongoRepository.aggregate([
      {
        $group: {
          _id: { memberId: memberIdKey },
          activeBookReservationsCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'Members',
          localField: '_id.memberId',
          foreignField: '_id',
          as: 'member_info',
        },
      },
      {
        $unwind: '$member_info',
      },
      {
        $project: {
          _id: 0,
          activeBookReservationsCount: 1,
          [nameof<Member>((x) => x.fullName)]: '$member_info.fullName',
          [nameof<Member>((x) => x.memberName)]: '$member_info.memberName',
          [nameof<Member>((x) => x.address)]: '$member_info.address',
          [nameof<Member>((x) => x.birthDate)]: '$member_info.birthDate',
        },
      },
      { $sort: { [nameof<Member>((x) => x.fullName)]: 1 } },
    ]);
    return await result.toArray();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MongoRepository, Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { IMembersRepo } from './members.interface.repo';

@Injectable()
export class MembersRepo
  extends BaseRepository<Member, string>
  implements IMembersRepo
{
  constructor(
    @InjectRepository(Member)
    private readonly memberMongoRepository: MongoRepository<Member>,
  ) {
    super(memberMongoRepository as Repository<Member>);
  }
}

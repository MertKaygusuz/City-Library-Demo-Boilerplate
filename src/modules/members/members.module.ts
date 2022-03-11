import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MembersRepo } from './domain/members.repo';
import { Member } from './entities/member.entity';
import { Member_Repo } from './domain/members.interface.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), BaseRepository],
  providers: [
    {
      provide: Member_Repo,
      useClass: MembersRepo,
    },
    MembersResolver,
    MembersService,
  ],
})
export class MembersModule {}

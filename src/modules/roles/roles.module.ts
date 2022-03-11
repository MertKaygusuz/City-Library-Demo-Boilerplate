import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { RolesRepo } from './domain/roles.repo';
import { Role } from './entities/role.entity';
import { Role_Repo } from './domain/roles.interface.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), BaseRepository],
  providers: [
    {
      provide: Role_Repo,
      useClass: RolesRepo,
    },
    RolesResolver,
    RolesService,
  ],
})
export class RolesModule {}

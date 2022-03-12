import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/domain-base/base-repo';
import { MongoRepository, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { IRolesRepo } from './roles.interface.repo';

@Injectable()
export class RolesRepo
  extends BaseRepository<Role, string>
  implements IRolesRepo
{
  constructor(
    @InjectRepository(Role)
    private readonly roleMongoRepository: MongoRepository<Role>,
  ) {
    super(roleMongoRepository as Repository<Role>);
  }
}

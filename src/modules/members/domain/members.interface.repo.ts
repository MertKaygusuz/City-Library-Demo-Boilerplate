import { IBaseRepository } from 'src/domain-base/base-repo.interface';
import { Member } from '../entities/member.entity';

export const Member_Repo = 'Members Repository';

export interface IMembersRepo extends IBaseRepository<Member, string> {}

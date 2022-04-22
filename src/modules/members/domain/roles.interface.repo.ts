import { IBaseRepository } from 'src/domain-base/base-repo.interface';
import { Role } from '../entities/role.entity';

export const Role_Repo = 'Roles Repository';

export interface IRolesRepo extends IBaseRepository<Role, string> {
  getRolesWithIncludingNames(roleNames: string[]): Promise<Role[]>;
}

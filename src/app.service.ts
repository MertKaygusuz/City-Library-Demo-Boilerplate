import { Inject, Injectable } from '@nestjs/common';
import {
  Member_Repo,
  IMembersRepo,
} from './modules/members/domain/members.interface.repo';
import {
  Role_Repo,
  IRolesRepo,
} from './modules/members/domain/roles.interface.repo';
import { Member } from './modules/members/entities/member.entity';
import { Role } from './modules/members/entities/role.entity';
import { addDaysToEpochTime } from './utils/functions/date-time';
import { createPasswordHash } from './utils/functions/password-related';

@Injectable()
export class AppService {
  constructor(
    @Inject(Member_Repo)
    private readonly membersRepo: IMembersRepo,
    @Inject(Role_Repo)
    private readonly rolesRepo: IRolesRepo,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async seedData() {
    const role1 = new Role();
    const role2 = new Role();
    role1.roleName = 'Admin';
    role2.roleName = 'User';
    await this.rolesRepo.insertMany([role1, role2]);

    const sharedPassword = '1234567890';
    const hashedPassword = createPasswordHash(sharedPassword);
    const dateNow = Date.now();
    const members: Array<Member> = [
      {
        memberName: 'Admin',
        fullName: 'Admin',
        birthDate: addDaysToEpochTime(dateNow, -30),
        address: "Admin's address",
        password: hashedPassword,
        roles: [role1, role2],
      } as Member,
      {
        memberName: 'User1',
        fullName: 'Orhan',
        birthDate: addDaysToEpochTime(dateNow, -30),
        address: "Orhan's address",
        password: hashedPassword,
        roles: [role2],
      } as Member,
      {
        memberName: 'User2',
        fullName: 'Kaya',
        birthDate: addDaysToEpochTime(dateNow, -40),
        address: "Kaya's address",
        password: hashedPassword,
        roles: [role2],
      } as Member,
      {
        memberName: 'User3',
        fullName: 'Kadriye',
        birthDate: addDaysToEpochTime(dateNow, -20),
        address: "Kadriye's address",
        password: hashedPassword,
        roles: [role2],
      } as Member,
    ];

    await this.membersRepo.insertMany(members);
  }

  async deleteAllData() {
    await Promise.all([this.membersRepo.delete({}), this.rolesRepo.delete({})]);
  }
}

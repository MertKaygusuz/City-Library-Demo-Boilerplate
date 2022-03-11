import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { Entity, Column, Index } from 'typeorm';

@Entity({ name: 'Members' })
export class Member extends BaseEntityModel<string> {
  @Column()
  @Index({ unique: true })
  memberName: string;

  @Column()
  fullName: string;

  @Column()
  birthDate: number;

  @Column()
  address: string;

  @Column()
  password: string;
}

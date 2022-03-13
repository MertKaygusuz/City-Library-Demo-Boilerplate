import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { Entity, Column, Index, AfterLoad } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'Members' })
@ObjectType()
export class Member extends BaseEntityModel<string> {
  @Column()
  @Index({ unique: true })
  @Field(() => String)
  memberName: string;

  @Column()
  @Field(() => String)
  fullName: string;

  @Column()
  @Field(() => String)
  birthDate: number;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  password: string;

  @Column()
  @Field(() => [Role])
  roles: Role[];

  @Field(() => String)
  memberId: string;

  @AfterLoad()
  getMemberIdField() {
    this.memberId = this._id;
  }
}

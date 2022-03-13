import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntityModel } from 'src/domain-base/base-entity-model';
import { AfterLoad, Column, Entity, Index } from 'typeorm';

@Entity({ name: 'Roles' })
@ObjectType()
export class Role extends BaseEntityModel<string> {
  @Field(() => String)
  @Column()
  @Index({ unique: true })
  roleName: string;

  @Field(() => String)
  roleId: string;

  @AfterLoad()
  getRoleIdField() {
    this.roleId = this._id;
  }
}

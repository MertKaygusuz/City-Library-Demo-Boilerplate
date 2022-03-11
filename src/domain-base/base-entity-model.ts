import {
  BeforeInsert,
  BeforeUpdate,
  ChildEntity,
  Column,
  Index,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

export abstract class BaseEntityModel<T extends string | ObjectID> {
  @ObjectIdColumn()
  _id: T;
  @Index()
  @Column()
  createdAt: number;
  @Column()
  updatedAt?: number | null;
  @Column()
  deletedAt?: number | null;
  @Column()
  createdBy: string;
  @Column()
  updatedBy?: string;
  @Column()
  deletedBy?: string;
  @Column()
  isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    this.isDeleted = false;
    this.createdAt = Date.now();
  }
}

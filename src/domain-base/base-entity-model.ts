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
  @Index()
  deletedAt?: number | null;
  @Column()
  createdBy: string;
  @Column()
  updatedBy?: string;
  @Column()
  @Index()
  deletedBy?: string;
  @Column()
  @Index()
  isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions() {
    this.isDeleted = false;
    this.createdAt = Date.now();
  }
}

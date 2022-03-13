import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  ObjectID,
  ObjectLiteral,
  ReplaceOneOptions,
  UpdateResult,
  UpdateWriteOpResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntityModel } from './base-entity-model';

export interface IBaseRepository<
  T extends BaseEntityModel<S>,
  S extends string | ObjectID,
> {
  create(data: T | any): Promise<T>;

  insertMany(data: DeepPartial<T>[]): Promise<any>;

  findOneById(id: S): Promise<T>;

  findByIds(ids: S[]): Promise<T[]>;

  findOne(filterCondition: any): Promise<T>;

  findWithOptions(relations: FindManyOptions<T>): Promise<T[]>;

  countWithOptions(relations: FindManyOptions<T>): Promise<number>;

  countWithConditions(relations: FindConditions<T>): Promise<number>;

  findAndCountWithOptions(
    relations: FindManyOptions<T>,
  ): Promise<[T[], number]>;

  findWithConditions(relations: FindConditions<T>): Promise<T[]>;

  findAndCountWithConditons(
    relations: FindConditions<T>,
  ): Promise<[T[], number]>;

  deleteById(id: S): Promise<DeleteResult>;

  delete(condition: FindConditions<T>): Promise<DeleteResult>;

  deleteByIdSoftly(id: S): Promise<UpdateResult>;

  deleteSoftly(condition: FindConditions<T>): Promise<UpdateResult>;

  updateById(id: S, update: QueryDeepPartialEntity<T>): Promise<UpdateResult>;

  update(
    condition: FindConditions<T>,
    update: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;
}

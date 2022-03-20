import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  ObjectID,
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

  findAndCountWithOptions(
    relations: FindManyOptions<T>,
  ): Promise<[T[], number]>;

  findWithConditions(relations: FindConditions<T>): Promise<T[]>;

  findAndCountWithConditons(
    relations: FindConditions<T>,
  ): Promise<[T[], number]>;

  deleteById(id: S): Promise<number>;

  delete(condition: FindConditions<T>): Promise<number>;

  deleteByIdSoftly(id: S): Promise<number>;

  deleteSoftly(condition: FindConditions<T>): Promise<number>;

  updateById(id: S, update: QueryDeepPartialEntity<T>): Promise<number>;

  update(
    condition: FindConditions<T>,
    update: QueryDeepPartialEntity<T>,
  ): Promise<number>;
}

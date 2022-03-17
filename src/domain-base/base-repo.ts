import { RequestContext } from 'src/middlewares/request-context';
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntityModel } from './base-entity-model';
import { IBaseRepository } from './base-repo.interface';

export class BaseRepository<
  T extends BaseEntityModel<S>,
  S extends string | ObjectID,
> implements IBaseRepository<T, S>
{
  private entity: Repository<T>;

  constructor(entity: Repository<T>) {
    this.entity = entity;
  }
  public async create(data: T | any): Promise<T> {
    return await this.entity.save(data);
  }

  public async insertMany(data: DeepPartial<T>[]): Promise<DeepPartial<T>[]> {
    return await this.entity.save(data);
  }

  public async findOneById(id: S): Promise<T> {
    return await this.entity.findOne(id);
  }

  public async findByIds(ids: S[]): Promise<T[]> {
    return await this.entity.findByIds(ids);
  }

  public async findOne(filterCondition: any): Promise<T> {
    return await this.entity.findOne({ where: filterCondition });
  }

  public async findWithOptions(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAndCountWithOptions(
    relations: FindManyOptions<T>,
  ): Promise<[T[], number]> {
    return await this.entity.findAndCount(relations);
  }

  public async findWithConditions(relations: FindConditions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAndCountWithConditons(
    relations: FindConditions<T>,
  ): Promise<[T[], number]> {
    return await this.entity.findAndCount(relations);
  }

  public async deleteById(id: S): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async delete(condition: FindConditions<T>): Promise<DeleteResult> {
    return await this.entity.delete(condition);
  }

  public async deleteByIdSoftly(id: S): Promise<UpdateResult> {
    const updatedFields = {
      deletedAt: Date.now(),
      deletedBy: RequestContext.getMemberIdFromRequest(),
    } as unknown as QueryDeepPartialEntity<T>;
    return await this.entity.update(id, updatedFields);
  }

  public async deleteSoftly(
    condition: FindConditions<T>,
  ): Promise<UpdateResult> {
    const updatedFields = {
      deletedAt: Date.now(),
      deletedBy: RequestContext.getMemberIdFromRequest(),
    } as unknown as QueryDeepPartialEntity<T>;
    return await this.entity.update(condition, updatedFields);
  }

  public async updateById(
    id: S,
    update: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const updateOverridden = {
      ...update,
      updatedAt: Date.now(),
      updatedBy: RequestContext.getMemberIdFromRequest(),
    };
    return await this.entity.update(id, updateOverridden);
  }

  public async update(
    condition: FindConditions<T>,
    update: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const updateOverridden = {
      ...update,
      updatedAt: Date.now(),
      updatedBy: RequestContext.getMemberIdFromRequest(),
    };
    return await this.entity.update(condition, updateOverridden);
  }
}

import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { SerializedModel } from '../common/serializers/model.serializer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ModelEntity } from '../common/entities/model.entity';

export class ModelRepository<T extends ModelEntity> extends Repository<T> {
  async getAll(throwsException = false) {
    return this.find()
      .then((entities) => {
        if (!entities && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entities ? entities : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async getById(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<T | null> {
    return await this.findOne({
      where: { id },
      relations,
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ? entity : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<T> {
    return this.save(inputs)
      .then(async (entity) => await this.getById((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: T,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<T> {
    return this.update(entity.id, inputs)
      .then(async () => await this.getById(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }

  async removeEntity(entity: T) {
    try {
      return this.delete(entity.id);
    } catch (e) {
      console.log(e);
    }
  }
}

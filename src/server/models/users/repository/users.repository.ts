// import { DeepPartial, EntityRepository, Repository } from 'typeorm';
// import {
//   allUserGroupsForSerializing,
//   SerializedUser,
// } from '../serializers/users.serializers';
// import { User } from '../entities/users.entity';
// import { NotFoundException } from '@nestjs/common';
// import { classToPlain, plainToClass } from 'class-transformer';
// import { SerializedModel } from '../../../common/serializers/model.serializer';
//
// @EntityRepository(User)
// export class UsersRepository extends Repository<SerializedUser> {
//   public getAll(): Promise<SerializedUser[]> {
//     return this.find();
//   }
//
//   public createUser(
//     inputs: DeepPartial<User>,
//     relations: string[] = [],
//   ): Promise<SerializedUser> {
//     return this.save(inputs);
//     // .then(async (entity) => await this.get((entity as any).id, relations))
//     // .catch((error) => Promise.reject(error));
//   }
//
//   async get(
//     id: string,
//     relations: string[] = [],
//     throwsException = false,
//   ): Promise<SerializedUser | null> {
//     return await this.findOne({
//       where: { id },
//       relations,
//     })
//       .then((entity) => {
//         if (!entity && throwsException) {
//           return Promise.reject(new NotFoundException('Model not found.'));
//         }
//
//         return Promise.resolve(entity ? this.transform(entity) : null);
//       })
//       .catch((error) => Promise.reject(error));
//   }
//
//   transform(model: User, transformOptions = {}): SerializedUser {
//     transformOptions = {
//       groups: allUserGroupsForSerializing,
//     };
//     console.log(classToPlain(model, transformOptions));
//     console.log(
//       plainToClass(
//         SerializedUser,
//         classToPlain(model, transformOptions),
//         transformOptions,
//       ),
//     );
//     return plainToClass(
//       SerializedUser,
//       classToPlain(model, transformOptions),
//       transformOptions,
//     );
//   }
//   transformMany(models: User[], transformOptions = {}): SerializedUser[] {
//     return models.map((model) => this.transform(model, transformOptions));
//   }
// }
import { EntityRepository } from 'typeorm';
import { User } from '../entities/users.entity';
import { ModelRepository } from '../../model.repository';
import {
  allUserGroupsForSerializing,
  SerializedUser,
} from '../serializers/users.serializers';
import { classToPlain, plainToClass } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, SerializedUser> {
  async getAll() {
    const result = await this.find();
    return this.transformMany(result);
  }

  async getByPhoneNumber(
    phoneNumber: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<User | null> {
    return await this.findOne({
      where: { phoneNumber },
      relations,
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ? this.transform(entity) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  transform(model: User): SerializedUser {
    const transformOptions = {
      groups: allUserGroupsForSerializing,
    };
    // console.log(classToPlain(model, transformOptions));
    return plainToClass(
      SerializedUser,
      // model,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: User[]): SerializedUser[] {
    return models.map((model) => this.transform(model));
  }
}

// import { Injectable } from '@nestjs/common';
// import { UsersRepository } from './repository/users.repository';
// import { SerializedUser } from './serializers/users.serializers';
// import { CreateUserDto } from './dto/createUser.dto';
//
// @Injectable()
// export class UsersService {
//   constructor(private usersRepository: UsersRepository) {}
//
//   getAll(): Promise<SerializedUser[]> {
//     return this.usersRepository.getAll();
//   }
//   async create(inputs: CreateUserDto): Promise<SerializedUser> {
//     return await this.usersRepository.createUser(inputs);
//   }
// }
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repository/users.repository';
import { SerializedUser } from './serializers/users.serializers';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async getById(id: string): Promise<SerializedUser | null> {
    return await this.usersRepository.get(id);
  }

  async create(inputs: CreateUserDto): Promise<SerializedUser> {
    if (!inputs.phoneNumber || !inputs.password || !inputs.name) {
      throw new HttpException('Wrong Parameters!', 500);
    }

    const candidate = await this.usersRepository.getByPhoneNumber(
      inputs.phoneNumber,
    );
    if (candidate) {
      throw new UnauthorizedException({
        message: 'Пользователь с таким phoneNumber уже существует.',
      });
    }

    const res = await this.usersRepository.createEntity(inputs);
    console.log(res);
    return res;
  }

  async getAll(): Promise<SerializedUser[]> {
    return this.usersRepository.getAll();
  }

  // async update(
  //   user: UserEntity,
  //   inputs: EditUserDto,
  // ): Promise<UserEntity> {
  //   return await this.usersRepository.updateEntity(inputs);
  // }
}

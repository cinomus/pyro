import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  allUserGroupsForSerializing,
  extendedUserGroupsForSerializing,
  SerializedUser,
} from './serializers/users.serializers';
import { CreateUserDto } from './dto/createUser.dto';
import { GetOneDto } from './dto/getOne.dto';

@Controller('users')
// Разрешенные данные/группы
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(): Promise<SerializedUser[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getOne(@Param() { id }: GetOneDto): Promise<SerializedUser | null> {
    return this.usersService.getById(id);
  }

  @Post('create')
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(
    @Req() req,
    @Body() createUserDto: CreateUserDto,
  ): Promise<SerializedUser> | void {
    return this.usersService.create(createUserDto);
  }
}

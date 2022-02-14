import { IUser } from '../interfaces/user.interface';

export interface CreateUserDto {
  name: string;
  phoneNumber: string;
  password: string;
}

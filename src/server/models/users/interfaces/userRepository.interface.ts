import { IUser } from './user.interface';

export interface IUsersRepository {
  // TODO: delete "?"
  save?(user: IUser): Promise<void>;
  update?(user: IUser): Promise<void>;
  getById?(id: string): Promise<IUser>;
  remove?(user: IUser): Promise<void>;
}
